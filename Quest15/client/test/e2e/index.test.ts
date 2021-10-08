import puppeteer, {Browser, Page} from 'puppeteer';

describe('test', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    test('Login page title', async () => {
        await page.goto('http://localhost:3000/login');
        const title = await page.title();
        expect(title).toEqual('로그인');
    });

    test('Main page title', async () => {
        await page.goto('http://localhost:3000');
        const title = await page.title();
        expect(title).toEqual('메모장');
    });

    afterAll(() => browser.close());
});