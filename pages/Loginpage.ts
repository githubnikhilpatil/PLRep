import { Page, Locator } from '@playwright/test';
import {GenericUtilityHelper} from '../utils/GenericUtilityHelper';
 
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

    await GenericUtilityHelper.highlight(this.LoginName );
    await this.LoginName.fill(username);
    await GenericUtilityHelper.highlight(this.LoginPassword);
    await this.LoginPassword.fill(password);
    await this.Login.click();
}


}