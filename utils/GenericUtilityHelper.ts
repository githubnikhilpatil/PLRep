import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';
import { Page, Locator } from '@playwright/test';
export class GenericUtilityHelper {
    private static readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    private static readonly encryptionVersion = 'v1';
    private static readonly encryptionSaltLength = 16;
    private static readonly encryptionIvLength = 12;
    private static readonly encryptionKeyLength = 32;
    private static readonly encryptionAuthTagLength = 16;
    
    private static readonly baseEmail =
        'automationsusers@gmail.com';

    public static generateRandomString(length: number): string {
        if (!Number.isInteger(length) || length <= 0) {
            throw new RangeError('Length must be a positive integer.');
        }

        let result = '';

        for (let index = 0; index < length; index++) {
            const randomIndex = Math.floor(Math.random() * this.characters.length);
            result += this.characters[randomIndex];
        }

        return result;
    }
    public static encryptPassword(password: string): string {
        return Buffer.from(password).toString('base64');
    }
    public static decryptPassword(encryptedPassword: string): string {
        return Buffer.from(encryptedPassword, 'base64').toString('utf8');
    }


    static main(): void {
        const result = this.encryptPassword('Nokia@500');
        console.log("password");
        console.log(result);
        console.log(this.decryptPassword(result) );

    }

 public static generateEmail(): string {
        const alias =
            `AutomationUser${this.generateRandomString(8)}`;

        const [username, domain] = this.baseEmail.split('@');

        return `${username}+${alias}@${domain}`;
    }


      static async highlight(element: Locator): Promise<void> {

        await element.evaluate((element: HTMLElement) => {

            const originalOutline = element.style.outline;

            element.style.outline = '2px solid #27a254';

            setTimeout(() => {
                element.style.outline = originalOutline;
            }, 500);

        });
    }

    private static validatePassphrase(passphrase: string): void {
        if (typeof passphrase !== 'string' || passphrase.length === 0) {
            throw new RangeError('Passphrase must be a non-empty string.');
        }
    }
}
//GenericUtilityHelper.main();






    
