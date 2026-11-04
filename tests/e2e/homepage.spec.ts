import{test, expect} from '@playwright/test' ;
import { HomePage } from '../../pages/HomePage';
test('Verify homepage loads successfully', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.checkPageLoaded();
});
