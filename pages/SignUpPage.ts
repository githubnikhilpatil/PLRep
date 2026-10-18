import { Locator, Page } from '@playwright/test';
import { GenericUtilityHelper } from '../utils/GenericUtilityHelper';

export class SignUpPage {
    readonly page: Page;
    readonly signUpHeading: Locator;
    readonly email: Locator;
    readonly termsOfUse: Locator;
    readonly recaptchaCheckbox: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpHeading = page.getByRole('heading', { name: 'Sign Up' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.termsOfUse = page.getByRole('checkbox', { name: 'I agree to the Terms of Use.' });
        this.recaptchaCheckbox = page
            .locator('iframe[title="reCAPTCHA"]')
            .contentFrame()
            .getByRole('checkbox', { name: "I'm not a robot" });
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
    }

    async signup(): Promise<string> {
        const NewUser= GenericUtilityHelper.generateEmail();
        await this.email.fill(NewUser);
        await this.termsOfUse.click();
        await this.page.pause();
        //await this.recaptchaCheckbox.click();
      //  await this.page.waitForTimeout(10000);
        await this.signUpButton.click();
        await this.page.waitForTimeout(10000);
        return NewUser;
    }
}
