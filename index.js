const  puppeteer = require('puppeteer');
const args = process.argv.slice(2);
const debug = parseInt(args[0]);
const username = args[1];
const password = args[2];

(async () => {
    // declare browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // navigate to page
    await page.goto('https://upmoodlecloud.up.edu.mx/');
    if (debug){
        await page.screenshot({path: './screenshots/landingpage.png'});
    }

    // find and click the acceder button
    const loginbtn = await page.$('#main-header > div > div > div > div.header-content > div > div.theme-loginform > a');
    await loginbtn.click();
    if (debug) {
        await page.screenshot({path: './screenshots/loginbtn.png'});
    }

    // fill in username and password
    await page.waitForSelector('#login-username');
    await page.type('#login-username', username);
    await page.type('#login-password', password);
    if (debug) {
        await page.screenshot({path: './screenshots/loginfilledin.png'});
    }

    // click login button
    const login = await page.$('#header-form-login > button');
    await login.click();
    await page.waitForSelector('#site-menu > div > div > div > ul > li.item-calendar > a');
    if (debug) {
        await page.screenshot({path: './screenshots/logged_in.png'});
    }

    await page.waitForTimeout(3000);
    if (debug) {
        await page.screenshot({path: './screenshots/logged_in_stuff_loaded.png'});
    }
    await browser.close();
})();