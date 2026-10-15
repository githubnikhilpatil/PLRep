import { Page, Locator } from '@playwright/test';
import {GenericUtilityHelper} from '../utils/GenericUtilityHelper';
 
export class LoginPage{

readonly page: Page;
readonly LoginName: Locator;
readonly LoginPassword: Locator;
readonly Login:Locator;
readonly SignUp:Locator;


constructor(page: Page)
{
this.page = page;
this.LoginName =page.locator('input[type="email"]');
this.LoginPassword = page.locator('input[type="password"]');
this.Login = page.getByRole('button',{name:'Login'});
this.SignUp = page.getByRole('link', { name: 'Sign Up' })
}


public async login(username: string, password: string): Promise<void> {

    await GenericUtilityHelper.highlight(this.LoginName );
    await this.LoginName.fill(username);
    await GenericUtilityHelper.highlight(this.LoginPassword);
    await this.LoginPassword.fill(password);
    await this.Login.click();
}

public async navigateToSignUp(): Promise<void> {
    await this.SignUp.click();
}

}