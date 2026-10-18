
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly'
];

const credentialsPath = path.resolve(
    process.cwd(),
    'config/gmail/credentials.json'
);

const tokenPath = path.resolve(
    process.cwd(),
    'config/gmail/token.json'
);

export class GmailHelper {

    /**
     * Authorizes Gmail using OAuth2.
     *
     * First run:
     * Pass the authorization code as process.argv[2].
     *
     * Later runs:
     * Reuses config/gmail/token.json.
     */
    private static async authorize(): Promise<OAuth2Client> {

        if (!fs.existsSync(credentialsPath)) {
            throw new Error(
                `Gmail credentials file not found: ${credentialsPath}`
            );
        }

        const credentials = JSON.parse(
            fs.readFileSync(credentialsPath, 'utf8')
        );

        const config = credentials.installed ?? credentials.web;

        if (!config) {
            throw new Error(
                'Invalid OAuth credentials.json file.'
            );
        }

        const oauth2Client = new google.auth.OAuth2(
            config.client_id,
            config.client_secret,
            config.redirect_uris?.[0]
        );

        // Reuse existing token.
        if (fs.existsSync(tokenPath)) {

            const tokens = JSON.parse(
                fs.readFileSync(tokenPath, 'utf8')
            );

            oauth2Client.setCredentials(tokens);

            return oauth2Client;
        }

        // First-time authorization.
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: SCOPES
        });

        console.log(
            '\nOpen this URL and authorize the test Gmail account:\n'
        );

        console.log(authUrl);

        const code = process.argv[2];

        if (!code) {
            throw new Error(
                'Authorization code not provided. ' +
                'Run the script with the code as an argument.'
            );
        }

        // Exchange authorization code for tokens.
        const { tokens } = await oauth2Client.getToken(
            code.trim()
        );

        oauth2Client.setCredentials(tokens);

        // Save tokens for future runs.
        fs.mkdirSync(path.dirname(tokenPath), {
            recursive: true
        });

        fs.writeFileSync(
            tokenPath,
            JSON.stringify(tokens, null, 2)
        );

        console.log(
            `Gmail OAuth token saved to: ${tokenPath}`
        );

        return oauth2Client;
    }

    /**
     * Decodes Gmail Base64URL content.
     */
    private static decodeBase64Url(data: string): string {

        return Buffer.from(data, 'base64url').toString('utf8');
    }

    /**
     * Extracts HTML and plain-text bodies from MIME parts.
     */
    private static extractBodies(payload: any): {
        html: string[];
        text: string[];
    } {

        const result = {
            html: [] as string[],
            text: [] as string[]
        };

        const visit = (part: any): void => {

            if (part.body?.data) {

                const decoded = this.decodeBase64Url(
                    part.body.data
                );

                if (part.mimeType === 'text/html') {
                    result.html.push(decoded);
                } else if (part.mimeType === 'text/plain') {
                    result.text.push(decoded);
                }
            }

            for (const child of part.parts ?? []) {
                visit(child);
            }
        };

        if (payload) {
            visit(payload);
        }

        return result;
    }

    /**
     * Decodes common HTML entities.
     */
    private static decodeHtmlEntities(value: string): string {

        return value
            .replace(/&amp;/gi, '&')
            .replace(/&quot;/gi, '"')
            .replace(/&apos;|&#39;/gi, "'")
            .replace(/&nbsp;/gi, ' ')
            .replace(/&#(\d+);/g, (_, n) =>
                String.fromCodePoint(Number(n))
            )
            .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
                String.fromCodePoint(parseInt(n, 16))
            );
    }

    /**
     * Normalizes visible HTML link text.
     */
    private static normalizeLinkText(value: string): string {

        return this.decodeHtmlEntities(
            value.replace(/<[^>]*>/g, ' ')
        )
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * Finds the URL associated with the exact expected link text.
     */
    private static extractLink(
        html: string[],
        text: string[],
        expectedLinkText: string
    ): string {

        for (const body of html) {

            const anchors = body.matchAll(
                /<a\b[^>]*href\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi
            );

            for (const match of anchors) {

                const url = this.decodeHtmlEntities(
                    match[2]
                ).trim();

                const label = this.normalizeLinkText(
                    match[3]
                );

                if (
                    label === expectedLinkText &&
                    /^https?:\/\//i.test(url)
                ) {
                    return url;
                }
            }
        }

        // Fallback for plain-text emails.
        const lines = text
            .map(body => this.decodeHtmlEntities(body))
            .join('\n')
            .split(/\r?\n/)
            .map(line => line.trim());

        for (let i = 0; i < lines.length; i++) {

            if (
                this.normalizeLinkText(lines[i]) ===
                expectedLinkText
            ) {

                const nearbyText = lines
                    .slice(i, Math.min(i + 4, lines.length))
                    .join('\n');

                const urls = nearbyText.match(
                    /https?:\/\/[^\s<>"']+/gi
                ) ?? [];

                if (urls.length > 0) {
                    return urls[0].replace(/[),.;]+$/, '');
                }
            }
        }

        throw new Error(
            `Link "${expectedLinkText}" was not found in the email.`
        );
    }

    /**
     * Polls Gmail and returns the requested verification URL.
     */
    public static async getVerificationLink(
        recipient: string,
        subjectKeyword: string,
        expectedLinkText: string,
        timeoutMs = 120_000
    ): Promise<string> {

        const auth = await this.authorize();

        const gmail = google.gmail({
            version: 'v1',
            auth
        });

        const startedAt = Date.now();

        while (Date.now() - startedAt < timeoutMs) {

            const response = await gmail.users.messages.list({
                userId: 'me',
                q: `to:${recipient} subject:("${subjectKeyword}") newer_than:1d`,
                maxResults: 10
            });

            for (const message of response.data.messages ?? []) {

                if (!message.id) {
                    continue;
                }

                const fullMessage = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                    format: 'full'
                });

                const headers =
                    fullMessage.data.payload?.headers ?? [];

                const subjectHeader = headers.find(
                    (header: { name?: string | null }) =>
                        header.name?.toLowerCase() === 'subject'
                );

                const actualSubject = subjectHeader?.value ?? '';

                if (
                    !actualSubject.toLowerCase().includes(
                        subjectKeyword.toLowerCase()
                    )
                ) {
                    continue;
                }

                const bodies = this.extractBodies(
                    fullMessage.data.payload
                );

                try {

                    const link = this.extractLink(
                        bodies.html,
                        bodies.text,
                        expectedLinkText
                    );

                    console.log(
                        `Verification email found: ${actualSubject}`
                    );

                    console.log(
                        `Matched link text: ${expectedLinkText}`
                    );

                    return link;

                } catch {
                    // Try other matching messages or poll again.
                }
            }

            await new Promise(resolve =>
                setTimeout(resolve, 5000)
            );
        }

        throw new Error(
            `Verification email/link "${expectedLinkText}" not found ` +
            `for ${recipient} with subject "${subjectKeyword}" ` +
            `within ${timeoutMs} ms.`
        );
    }
}
