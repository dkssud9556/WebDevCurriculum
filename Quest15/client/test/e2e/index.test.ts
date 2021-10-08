import puppeteer, {Browser, Page} from 'puppeteer';

describe('test', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false, slowMo: 50 });
        page = await browser.newPage();
    });

    test('Login page title', async () => {
        await page.goto('http://localhost:3000/login');
        const title = await page.title();
        expect(title).toEqual('로그인');
    });

    test('login test', async () => {
        await page.goto('http://localhost:3000/login');
        await page.type('#username', 'user1');
        await page.type('#password', 'pass1');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toEqual('로그인 성공');
            await dialog.accept();
        });
        await page.click('button');
    });

    afterAll(() => browser.close());
});