import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { SignupPage } from '../../pages/SignupPage';

// Read the JSON file and turn it into a list of test cases
const filePath = path.resolve(process.cwd(), 'test-data/signupData.json');
const signupCases = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Test 1: the page opens
test('SU-00: sign-up page opens', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.open();

  await signupPage.checkPageLoaded();
});

// Tests 2 onward: one test is made for each case in the JSON file
for (const data of signupCases) {
  test(data.caseName, async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Make a new email every run when the data says RANDOM
    const email = data.email === 'RANDOM' ? `test${Date.now()}@mailinator.com` : data.email;

    await signupPage.open();
    await signupPage.fillForm(data.firstName, data.lastName, email, data.password);
    await signupPage.clickCreate();

    if (data.expected === 'success') {
      await signupPage.checkSignupSuccess();
    } else {
      await signupPage.checkSignupError();
    }
  });
}