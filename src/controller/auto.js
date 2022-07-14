const puppeteer = require('puppeteer');

class AutoWash {
    constructor(params) {
        this._id = params.id;
        this._passwd = params.passwd;
        this._url = 'https://autowash.co.kr/member/login.php';
        this._checkUrl = 'https://autowash.co.kr/event/attend_stamp.php?sno=3';
        this._logoutUrl = 'https://autowash.co.kr/member/logout.php?returnUrl=';
    }

    async getBrowser() {
        const broswer = await puppeteer.launch({ignoreHTTPSErrors: true, args: ['--no-sandbox', '--disable-dev-shm-usage']});
        return Promise.resolve(broswer);
    }

    async check() {
        const browser = await this.getBrowser();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        await page.goto(this._url);

        await page.type('input[name="loginId"]', this._id)
        await page.type('input[name="loginPwd"]', this._passwd)
        await page.keyboard.press('Enter');
        // await page.click('button[type="submit"]')
        // await page.waitFor(2000);
        await page.waitForNavigation();
        // await page.waitForNavigation({
        //     waitUntil: 'domcontentloaded',
        // });

        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.dismiss();
            await browser.close();
            return;
        });
        await page.goto(this._checkUrl);
        await page.waitFor(4000);

        let selector = 'button[id="attendanceCheck"]';
        await page.evaluate((selector) => document.querySelector(selector).click(), selector);


        // await page.click('button[id="attendanceCheck"]')
        // await page.waitFor(4000);
        // await page.keyboard.press('Enter');
        await page.goto(this._logoutUrl);
        await page.waitForNavigation();

        await browser.close()
    }

}

module.exports = AutoWash;