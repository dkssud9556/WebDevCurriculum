import puppeteer, {Browser, Page} from "puppeteer";

describe('e2e test', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    test('test', async () => {
        await page.goto('../../dist/index.html');
    })
});