/* global page */

jest.setTimeout(15 * 1000);

describe('15_reactmemoref', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #app > ul > li:nth-child(1) > input');
    await page.click('body > #app > ul > li:nth-child(1) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > ul > li:nth-child(2) > input');
    await page.click('body > #app > ul > li:nth-child(2) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > ul > li:nth-child(3) > input');
    await page.click('body > #app > ul > li:nth-child(3) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > ul > li:nth-child(1) > input');
    await page.click('body > #app > ul > li:nth-child(1) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > ul > li:nth-child(2) > input');
    await page.click('body > #app > ul > li:nth-child(2) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > ul > li:nth-child(3) > input');
    await page.click('body > #app > ul > li:nth-child(3) > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();
  });
});
