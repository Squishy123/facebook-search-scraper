const scraper = require('./scraper.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

require('dotenv').config();

(async () => {
    try {
     //launch browser
    let browser = await puppeteer.launch({ headless: true });

    //launch page
    let page = await browser.newPage();

    //go to login page
    await scraper.login(browser, page,
        process.env.FB_USERNAME, process.env.FB_PASSWORD);

    //search and get results
    let results = await scraper.search(browser, page, "john wick");

    //export results    
    await fs.writeFile('search.json', JSON.stringify(results), (err, data) => {
        if(err)
            console.log(err);
        console.log("Successfully written!");
    });
    
    //close page and browser
    await page.close();
    await browser.close();

    } catch(err) {
        console.log(err);
    }
    
})();