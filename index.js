const  puppeteer = require('puppeteer');
const args = process.argv.slice(2);
const debug = parseInt(args[0]);

(async () => {
    // declare browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // navigate to page
    await page.goto('https://upmoodlecloud.up.edu.mx/');
    if (debug){
        await page.screenshot({path: './screenshots/landingpage.png'});
    }

    // find the acceder button
    const loginbtn = await page.$('#main-header > div > div > div > div.header-content > div > div.theme-loginform > a');
    await loginbtn.click();
    if (debug) {
        await page.screenshot({path: './screenshots/loginbtn.png'});
    }
    await browser.close();
})();