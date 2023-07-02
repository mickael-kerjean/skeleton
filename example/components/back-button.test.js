import puppeteer from "puppeteer";
import BackButton from "./back-button.js";

let browser;
let page;

beforeAll(async () => browser = await puppeteer.launch({headless: 'new'}));
afterAll(async () => await browser.close());
beforeEach(async () => {
    page = await browser.newPage()
    page.setViewport({width: 1080, height: 1024});
});
afterEach(async () => {
    // close page
})

test("basic", async () => {
    const three = await page.evaluate(() => {
        return 1 + 2;
    });
    expect(three).toBe(3)
})

test("dom", async () => {
    // await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    await page.evaluateOnNewDocument(BackButton);
    const body = await page.evaluate(() => document.documentElement.outerHTML);
    console.log(body);
    
    const three = await page.evaluate(() => {
        return 1 + 2;
    });
    expect(three).toBe(3)
});
