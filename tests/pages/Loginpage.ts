import { Page, Locator } from '@playwright/test';

export class LoginPage{

readonly page: Page;
readonly LoginName: Locator;
readonly LoginPassword: Locator;
readonly Login:Locator;


constructor(page: Page)
{
this.page = page;
this.LoginName =page.locator('input[type="email"]');
this.LoginPassword = page.locator('input[type="password"]');
this.Login = page.getByRole('button',{name:'Login'});
}


public async login(username: string, password: string): Promise<void> {
    await this.LoginName.fill(username)
    await this.LoginPassword.fill(password);
    await this.Login.click();
}


}