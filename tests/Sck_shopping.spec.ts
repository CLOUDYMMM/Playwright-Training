import { test, expect } from '@playwright/test';

const shoppingData = [
    {
        "TestName": "First Shopping Test",
        "ItemName": "Balance Training Bicycle",
        "ItemPrice": "4,314.60",
        "ItemPoint": "43",
        "ItemQuantity": "1",
        "ExpectedCartCount": "1",
        "ExpectedTotalPrice": "4,314.60",
        "FirstName": "Matichai",
        "LastName": "Duangjit",
        "Address": "123 หมู่ 6, ถนนสุขุมวิท",
        "SubDistrict": "บางนา",
        "District": "เขตบางนา",
        "Province": "กรุงเทพมหานคร",
        "ExpectedPostalCode": "10260",
        "PhoneNumber": "0625928956",

    },

];

shoppingData.forEach(({TestName, ItemName, ItemPrice, ItemPoint, ItemQuantity, ExpectedCartCount, ExpectedTotalPrice, FirstName, LastName, Address, SubDistrict, District, Province, ExpectedPostalCode, PhoneNumber}) => {
    test(`${TestName}: [ItemName: ${ItemName}, ItemPrice: ${ItemPrice}, ItemPoint: ${ItemPoint}, ItemQuantity: ${ItemQuantity}, FirstName: ${FirstName}, LastName: ${LastName}, Address ${Address}, SubDistrict ${SubDistrict}, District ${District}, Province ${Province}, PhoneNumber ${PhoneNumber}`, async ({ page }) => { 
        
        await test.step('เข้าหน้าเว็บ', async () => {
            await page.goto('http://sck-dojo.ddns.net:8000/product/list');
        });

        await test.step('ค้นหาสินค้าที่ Search bar', async () => {
            await page.locator("[id='search-product-input']").fill(ItemName)
            await page.locator("[id='search-product-btn']").click(); 
        });

        await test.step('ตรวจสอบผลการค้นหา', async () => {
            await expect(page.locator("[id='product-card-name-1']")).toContainText(ItemName);
            await expect(page.locator("[id='product-card-price-1']")).toContainText(ItemPrice);
        });

        await test.step('กดดูรายละเอียดสินค้าและตรวจสอบ ชื่อ ราคา แต้มที่จะได้ของสินค้า', async () => {
            await page.locator("[id='product-card-name-1']").click();
            await expect(page.locator("[id='product-detail-product-name']")).toContainText(ItemName);
            await expect(page.locator("[id='product-detail-price-thb']")).toContainText(ItemPrice);
            await expect(page.locator("[id='product-detail-point']")).toContainText(ItemPoint);
        });

        await test.step('เพิ่มสินค้าไปยังตะกร้าและตรวจสอบ icon ตระกร้ามีสินค้าอยู่ ', async () => {
            await page.locator("[id='product-detail-quantity-input']").fill(ItemQuantity);
            await page.locator("[id='product-detail-add-to-cart-btn']").click(); 
            await expect(page.locator("[id='header-menu-cart-badge']")).toContainText(ExpectedCartCount);
        });

        await test.step('ไปที่ตระกร้าสินค้าและตรวจสอบรายละเอียดสินค้าในตระกร้าแล้วกด Checkout ', async () => {
            await page.locator("[id='header-menu-cart-btn']").click();
            await expect(page.locator("[id='product-1-name']")).toContainText(ItemName);
            await expect(page.locator("[id='product-1-price']")).toContainText(ItemPrice);
            await expect(page.locator("[id='product-1-quantity-input']")).toHaveValue(ItemQuantity);
            await expect(page.locator("[id='product-1-point']")).toContainText(ItemPoint);
            await expect(page.locator("[id='shopping-cart-subtotal-price']")).toContainText(ExpectedTotalPrice);
            await page.locator("[id='shopping-cart-checkout-btn']").click();
        });

        await test.step('กรอกชื่อผู้รับและที่อยู่จากนั้นเลือกพื้นที่จัดส่ง จังหวัด อำเภอ ตำบล เสร็จแล้วตรวจรหัสไปรษณีย์จากนั้นกรอกเบอร์โทร', async () => {
            await page.locator("[id='shipping-form-first-name-input']").fill(FirstName);
            await page.locator("[id='shipping-form-last-name-input']").fill(LastName);
            await page.locator("[id='shipping-form-address-input']").fill(Address);
            await page.locator("[id='shipping-form-province-select']").selectOption(Province);
            await page.locator("[id='shipping-form-district-select']").selectOption(District);
            await page.locator("[id='shipping-form-sub-district-select']").selectOption(SubDistrict);
            await expect(page.locator("[id='shipping-form-zipcode-input']")).toHaveAttribute(ExpectedPostalCode);
            await page.locator("[id='shipping-form-mobile-input']").fill(PhoneNumber);

        });
    });
});