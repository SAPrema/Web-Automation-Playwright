import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { LoginPage } from '../../pages/LoginPage';

const filePath = path.resolve(process.cwd(), 'test-data/loginData.json');
const loginCases = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

test('LG-00: login page opens', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.checkPageLoaded();
});

for (const data of loginCases) {
  test(data.caseName, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.fillForm(data.email, data.password);
    await loginPage.clickSignIn();

    if (data.expected === 'success') {
      await loginPage.checkLoginSuccess();
    } else {
      await loginPage.checkLoginError();
    }
  });
}
