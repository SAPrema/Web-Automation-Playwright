import { Page, expect } from '@playwright/test';

export class SignupPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Open the sign-up page
  async open() {
    await this.page.goto('/account/register');
  }

  // Fill the form. A field left empty is skipped.
  async fillForm(firstName: string, lastName: string, email: string, password: string) {
    if (firstName) {
      await this.page.locator('input[name="customer[first_name]"]').fill(firstName);
    }
    if (lastName) {
      await this.page.locator('input[name="customer[last_name]"]').fill(lastName);
    }
    if (email) {
      await this.page.locator('input[name="customer[email]"]').fill(email);
    }
    if (password) {
      await this.page.locator('input[name="customer[password]"]').fill(password);
    }
  }

  // Click the Create button
  async clickCreate() {
    await this.page.getByRole('button', { name: /create/i }).click();
  }

  // Check we are on the sign-up page
  // async checkPageLoaded() {
  //   await expect(this.page).toHaveURL(/account\/register/);
  // }

  // Success: the user leaves the sign-up page
  async checkSignupSuccess() {
    await expect(this.page).not.toHaveURL(/account\/register/);
  }

  // Error: the user stays on the sign-up page
  async checkSignupError() {
    await expect(this.page).toHaveURL(/account\/register/);
  }
}