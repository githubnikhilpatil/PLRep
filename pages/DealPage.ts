import { Page, Locator } from '@playwright/test';
import {GenericUtilityHelper} from '../utils/GenericUtilityHelper';
import {BasePage} from './BasePage';
import { Deal } from '../entities/Deal';
export class DealPage extends BasePage {

readonly page: Page; 
readonly pageTitle: Locator;
readonly Deals: Locator;
readonly DealsTitle: Locator;
readonly UserAccess: Locator;
readonly Company: Locator;
readonly Product: Locator;
readonly Contact: Locator;


constructor( page:Page) {
    super(page);
this.page =page;
this.pageTitle = page.getByRole('heading',{name:'New Deal', exact: true });
this.Deals =   page.getByRole('link', { name: 'Deals', exact: true });
this.DealsTitle =  page.getByRole('textbox', { name: 'Title' });
this.UserAccess =  page.getByRole('button', { name: 'Select users allowed access.' });
this.Company =  page.getByText('Company', { exact: true })
        .locator('..').getByRole('button')
this.Product =  page.getByText('Products', { exact: true }).
          locator('..').locator('div');
this.Contact =  page.getByText('Contacts', { exact: true })
        .locator('..').locator('div');
}

public async Create_New_Deal(deal?: Deal):  Promise<{ success: boolean; DealTitle: string }> 
{

await this.Create.waitFor({
        state: 'visible'
    });
if (await this.Create.isVisible()) {
    await this.Create.click();
    }

await this.pageTitle.waitFor({ state: 'visible' });



if (deal?.DealsTitle !== undefined) {
    await this.DealsTitle.fill(deal.DealsTitle);
}
if (deal?.Description !== undefined) {
    await this.page.getByLabel('Description').fill(deal.Description);
}
if (deal?.Probability !== undefined) {
    await this.page.getByRole('spinbutton', { name: 'Probability' })
        .fill(String(deal.Probability));
}
if (deal?.Amount !== undefined) {
    await this.page.getByRole('spinbutton', { name: 'Amount' })
        .fill(String(deal.Amount));
}
if (deal?.Commission !== undefined) {
    await this.page.getByRole('spinbutton', { name: 'Commission' })
        .fill(String(deal.Commission));
}
if (deal?.NextSteps !== undefined) {
    await this.page.getByLabel('Next Steps').fill(deal.NextSteps);
}

if (deal?.Stage) {
    await this.page.getByLabel('Stage').selectOption(deal.Stage);
}
if (deal?.Status) {
    await this.page.getByLabel('Status').selectOption(deal.Status);
}
if (deal?.Type) {
    await this.page.getByLabel('Type').selectOption(deal.Type);
}
await this.page.getByText('Closed', { exact: true })
    .locator('..')
    .getByRole('checkbox').setChecked(deal?.Isclosed ?? true);

if (deal?.Company) {
    await this.Company.click();
    await this.page.getByRole('textbox', { name: 'Search' }).fill(deal.Company);
    await this.page.getByRole('button', { name: deal.Company }).nth(1).click();
}
if (deal?.Products) {
    await this.Product.click();
    await this.page.getByRole('textbox', { name: 'Search' }).fill(deal.Products);
    await this.page.getByRole('button', { name: deal.Products }).nth(1).click();
}
if (deal?.Contacts) {
    await this.Contact.click();
    await this.page.getByRole('textbox', { name: 'Search' }).fill(deal.Contacts);
    await this.page.getByRole('button', { name: deal.Contacts }).nth(1).click();
}


await this.Save.click();

const savedDeal = this.page.getByRole('heading', {
    name: `${deal?.DealsTitle}`,
    exact: true
});
await savedDeal.waitFor({ state: 'visible',timeout: 5000});

if(await savedDeal.isVisible())
{
  return {
        success: true,
        DealTitle: String(deal?.DealsTitle)
  }

}else
{
  return {
        success: true,
        DealTitle:String(deal?.DealsTitle)
  }
}

}

}