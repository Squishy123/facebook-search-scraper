/**
 * Scraper module
 * Contains the methods/functions for generic facebook search
 */

 const puppeteer = require('puppeteer');

 const LOGIN_URL = 'https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=111';

 //login selectors
 const LOGIN_USERNAME_SELECTOR = '#email';
 const LOGIN_PASSWORD_SELECTOR = '#pass';
 const LOGIN_SUBMIT_SELECTOR = '#loginbutton';

 async function login(browser, page, username, password) {
    //navigate to login page
    await page.goto(LOGIN_URL);

    //type in username and password
    await page.type(LOGIN_USERNAME_SELECTOR, username);
    await page.type(LOGIN_PASSWORD_SELECTOR, password);

    //submit button
    await page.tap(LOGIN_SUBMIT_SELECTOR);
 }

 //export functions
 module.exports = {
     login: login
 };