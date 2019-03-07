const scraper = require('./scraper.js');
const puppeteer = require('puppeteer');

require('dotenv').config();

(async () => {
    try {
     //launch browser
    let browser = await puppeteer.launch({ headless: false });

    //launch page
    let page = await browser.newPage();

    //go to login page
    await scraper.login(browser, page,
        process.env.FB_USERNAME, process.env.FB_PASSWORD);

    //search 
    let results = await scraper.search(browser, page, "john wick");
    console.log(results);
    } catch(err) {
        console.log(err);
    }
})();