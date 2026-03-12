import { test, expect } from '@playwright/test';

const loginData = [
    {
        "testName": "Login Succeeded",
        "username": "demo",
        "password": "mode",
        "expectedMessage": "Login succeeded", 
    },
    {
        "testName": "Login failed:username wrong",
        "username": "demoo",
        "password": "mode",
        "expectedMessage": "Login failed", 
    },
    {
        "testName": "Login failed: password wrong",
        "username": "demo",
        "password": "modee",
        "expectedMessage": "Login failed", 
    },
    {
        "testName": "Login failed: username and password wrong",
        "username": "demoo",
        "password": "modee",
        "expectedMessage": "Login failed", 
    },
    {
        "testName": "Login failed: empty username",
        "username": "",
        "password": "mode",
        "expectedMessage": "Login failed", 
    },
    {
        "testName": "Login failed: empty password",
        "username": "demo",
        "password": "",
        "expectedMessage": "Login failed", 
    },
    {
        "testName": "Login failed: empty username and password",
        "username": "",
        "password": "",
        "expectedMessage": "Login failed", 
    }
];

loginData.forEach(({testName, username, password, expectedMessage}) => {
    test(`${testName}: [username: ${username}, password: ${password}]`, async ({ page }) => { 
        
        await test.step('เข้าหน้าเว็บ', async () => {
            await page.goto('https://demo-login-workshop.vercel.app/');
        });

        await test.step('ใส่ Username และ Password', async () => {
            await page.locator("[id='username_field']").fill(username);
            await page.locator("[id='password_field']").fill(password);
            await page.locator("[id='login_button']").click(); 
        });

        await test.step('ตรวจสอบผลการ Login', async () => {
            await expect(page.locator("[id='container']")).toContainText(expectedMessage);
        });
    });
});