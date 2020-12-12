/* global page */

jest.setTimeout(15 * 1000);

describe('06_customhook', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #app > div:nth-child(1) > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(1) > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(1) > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(1) > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(1) > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(1) > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(1) > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(1) > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(2) > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(2) > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(2) > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(2) > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();
  });
});
