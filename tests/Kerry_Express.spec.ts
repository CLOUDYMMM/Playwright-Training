import { test, expect } from '@playwright/test';


test('Open Kerry Express and verify title', async ({ page }) => {
    //เข้าหน้าเว็บ
    await page.goto('https://th.kex-express.com/en/track/');

    // ใส่หมายเลขพัสดุ
    await page.locator('input.tracking-input').click();
    await page.locator('textarea.textarea-scroll').fill('SDOF5208664423');
    await page.locator('textarea.textarea-scroll').press('Enter');

    //ตรวจสอบเลขพัสดุ และวันที่ เวลา
    await expect(page.locator('span.con')).toHaveText('SDOF5208664423');
    await expect(page.locator('span.text-1418.light')).toContainText('Date  03 Dec 2025');
    await expect(page.locator('span.text-1418.light')).toContainText('Time 15:');
    
    
    
});

