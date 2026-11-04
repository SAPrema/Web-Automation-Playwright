import { expect, Page } from "@playwright/test";
export class HomePage { 
    page: Page;

    constructor(page:Page){
        this.page = page;
    } 
    async open() {
        await this.page.goto ('https://sauce-demo.myshopify.com/');
    }

      async checkPageLoaded() {
        await expect(this.page).toHaveURL('https://sauce-demo.myshopify.com/');
        await expect(this.page).toHaveTitle('Sauce Demo');
    }


}