const  puppeteer = require('puppeteer');
const args = process.argv.slice(2);
const debug = parseInt(args[0]);
const username = args[1];
const password = args[2];
const uploadFile = args[3];
const uploadedFileName = args[4];

(async () => {
    // declare browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // navigate to page
    await page.goto('https://upmoodlecloud.up.edu.mx/');
    if (debug){
        await page.screenshot({path: './_screenshots/1_landingpage.png'});
    }

    // find and click access button
    const loginBtn = await page.$('#main-header > div > div > div > div.header-content > div > div.theme-loginform > a');
    await loginBtn.click();
    if (debug) {
        await page.screenshot({path: './_screenshots/2_loginBtn.png'});
    }

    // fill in username and password
    await page.waitForSelector('#login-username');
    await page.type('#login-username', username);
    await page.type('#login-password', password);
    if (debug) {
        await page.screenshot({path: './_screenshots/3_loginID.png'});
    }

    // click login button
    const login = await page.$('#header-form-login > button');
    await login.click();
    await page.waitForSelector('#site-menu > div > div > div > ul > li.item-calendar > a');
    if (debug) {
        await page.screenshot({path: './_screenshots/4_loggedIn_StuffLoading.png'});
    }
    // slow to load
    await page.waitForTimeout(3000);
    if (debug) {
        await page.screenshot({path: './_screenshots/5_loggedIn_StuffLoaded.png'});
    }

    //find and click 'manage private files' link
    const managePrivateFilesLink = await page.$('#inst123558 > div > div > div.footer > a');
    await managePrivateFilesLink.click();
    // slow to load
    await page.waitForTimeout(3000);
    if (debug) {
        await page.screenshot({path: './_screenshots/6_managePrivateFilesSplash.png'});
    }

    //find and click add button
    const privateFilesAdd = await page.$('#filemanager-624131a738a16 > div.fp-navbar.bg-faded.card.mb-0 > div.filemanager-toolbar.icon-no-spacing > div.fp-toolbar > div.fp-btn-add > a');
    await privateFilesAdd.click();
    // slow to load
    await page.waitForTimeout(3000);
    if (debug) {
        await page.screenshot({path: './_screenshots/7_privateFilesAdd.png'});
    }

   //find and click uploadFile button
   const privateFilesUpload = await page.$('#fp-repo-624132887ed4c-5 > a');
   await privateFilesUpload.click();
   // slow to load
   await page.waitForTimeout(3000);
   if (debug) {
       await page.screenshot({path: './_screenshots/8_managePrivateFilesUpload.png'});
   }



    // find and click the user button
    const userBtn = await page.$('#main-header > div > div > div > div.header-content > div > div.theme-loginform > a');
    await userBtn.click();
    if (debug) {
        await page.screenshot({path: './_screenshots/A_userBtn.png'});
    }

    // find and click the logout button
    const logoutBtn = await page.$('#actionmenuaction-6');
    await logoutBtn.click();
    await page.waitForTimeout(3000);

    if (debug) {
        await page.screenshot({path: './_screenshots/B_loggedOut.png'});
    }


    await browser.close();
})();