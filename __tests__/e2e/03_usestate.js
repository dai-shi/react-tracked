/* global page */

const port = process.env.PORT || '8080';
jest.setTimeout(15 * 1000);

describe('03_usestate', () => {
  it('should work with recorded events', async () => {
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button');
    await page.click('body > #app > div:nth-child(2) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button');
    await page.click('body > #app > div:nth-child(2) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button');
    await page.click('body > #app > div:nth-child(3) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button');
    await page.click('body > #app > div:nth-child(3) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button');
    await page.click('body > #app > div:nth-child(3) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(5) > div:nth-child(1) > input');
    await page.click('body > #app > div:nth-child(5) > div:nth-child(1) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(1) > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(1) > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(1) > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(2) > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(2) > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(2) > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(3) > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(3) > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(3) > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();
  });
});
