import { test, expect } from '@playwright/test';

test('Open google and verify title', async ({ page }) => {
  //เข้าหน้าเว็บ
  await page.goto('https://www.google.com');

  // ใส่คำค้นหา
  const searchInputText = await page.getByRole('combobox');
  searchInputText.fill
  ('ร้านอาหารญี่ปุ่นใกล้ฉัน');
  searchInputText.press('Enter');

  //ตรวจสอบผลการ
  await expect(page.getByText('เท็นชิโนะ')).
  toBeVisible();



  
});