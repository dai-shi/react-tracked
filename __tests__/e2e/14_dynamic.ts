/* global page */

jest.setTimeout(15 * 1000);

describe('14_dynamic', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > input');
    await page.click('body > #app > div:nth-child(2) > div > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(2) > div > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > input');
    await page.click('body > #app > div:nth-child(3) > div > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(3) > div > input', '1');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(5) > div:nth-child(1) > input');
    await page.click('body > #app > div:nth-child(5) > div:nth-child(1) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(1) > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(5) > div > button');
    await page.click('body > #app > div:nth-child(5) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(5) > div:nth-child(1) > input');
    await page.click('body > #app > div:nth-child(5) > div:nth-child(1) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('body > #app > div:nth-child(5) > div:nth-child(1) > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(6) > div > button');
    await page.click('body > #app > div:nth-child(6) > div > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();
  });
});
