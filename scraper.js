/**
 * Scraper module
 * Contains the methods/functions for generic facebook search
 */

 const puppeteer = require('puppeteer');

 //base url for login
 const LOGIN_URL = 'https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=111';

 //login selectors
 const LOGIN_USERNAME_SELECTOR = '#email';
 const LOGIN_PASSWORD_SELECTOR = '#pass';
 const LOGIN_SUBMIT_SELECTOR = '#loginbutton';

//base url for searching 
const SEARCH_URL = `https://www.facebook.com/search/people/?q=FILL&epa=SEE_MORE`

//search selectors
const SEARCH_RESULT_SELECTOR = '#BrowseResultsContainer';
const SEARCH_ITEM_SELECTOR = 'div._4p2o';
const SEARCH_PIC_SELECTOR = 'a._2ial > img'
const SEARCH_NAME_SELECTOR = 'a._32mo';

 /**
  * Login to facebook using the given params
  * @param {Browser} browser 
  * @param {Page} page 
  * @param {String} username 
  * @param {String} password 
  */
 async function login(browser, page, username, password) {
    //navigate to login page
    await page.goto(LOGIN_URL);

    //type in username and password
    await page.type(LOGIN_USERNAME_SELECTOR, username);
    await page.type(LOGIN_PASSWORD_SELECTOR, password);

    //submit button
    await page.tap(LOGIN_SUBMIT_SELECTOR);
 }


async function search(browser, page, searchQuery) {
    //navigate to search
    await page.goto(SEARCH_URL.replace('FILL', searchQuery));

    let profiles;
    //extract all profiles
    profiles = await page.$$eval(SEARCH_NAME_SELECTOR, function (names) {
        return names.map((n) => {
            return {name: n.textContent, href: n.href}
        });
    });

    //add images to each profile
    profiles = await page.$$eval(SEARCH_PIC_SELECTOR, function (pics, profiles) {
        pics.forEach((p, i) => {
            profiles[i].src = p.src;
        });

        return profiles
    }, profiles);

    return profiles;
}

 //export functions
 module.exports = {
     login: login,
     search: search
 };

