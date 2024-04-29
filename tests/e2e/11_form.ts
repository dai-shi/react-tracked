import puppeteer from 'puppeteer';

jest.setTimeout(15 * 1000);

describe('11_form', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('#app > form > div:nth-child(3) > div > input');
    await page.click('#app > form > div:nth-child(3) > div > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > form > div:nth-child(3) > div > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > form > div:nth-child(3) > div > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > form > div:nth-child(3) > div > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > form > div:nth-child(5) > div > input', '2');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > form > div:nth-child(5) > div > input', '2');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > form > div:nth-child(5) > div > input', '2');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > form > div > div > select');
    await page.click('#app > form > div > div > select');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.select('#app > form > div > div > select', 'male');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > form > div:nth-child(9) > div > input');
    await page.click('#app > form > div:nth-child(9) > div > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > form > button');
    await page.click('body > #app > form > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await browser.close();
  });
});
