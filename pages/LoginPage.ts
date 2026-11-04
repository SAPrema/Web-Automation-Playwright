import { Page, expect } from '@playwright/test';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/account/login');
  }

  async fillForm(email: string, password: string) {
    if (email) {
      await this.page.locator('input[name="customer[email]"]').fill(email);
    }
    if (password) {
      await this.page.locator('input[name="customer[password]"]').fill(password);
    }
  }

  // Close the pop-up modal if it appears
  async closeModalIfShown() {
    const closeButton = this.page.getByTestId('authorize-modal-close-button');

    // Wait up to 3 seconds for the modal. If it never appears, move on.
    try {
      await closeButton.waitFor({ state: 'visible', timeout: 3000 });
      await closeButton.click();
    } catch {
      // No modal this time, so nothing to close
    }
  }

  async clickSignIn() {
    await this.page.getByRole('button', { name: /sign in|log in|login/i }).click();
  }

  async checkPageLoaded() {
    await expect(this.page).toHaveURL(/account\/login/);
  }

  async checkLoginSuccess() {
    await expect(this.page).not.toHaveURL(/account\/login/);
  }

  async checkLoginError() {
    await expect(this.page).toHaveURL(/account\/login/);
  }
}
