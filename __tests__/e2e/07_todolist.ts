/* global page */

jest.setTimeout(15 * 1000);

describe('07_todolist', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('#app > div > div > form > input');
    await page.click('#app > div > div > form > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'a');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > div > div > form > button');
    await page.click('#app > div > div > form > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > div > div > form > input');
    await page.click('#app > div > div > form > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'b');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > div > div > form > button');
    await page.click('#app > div > div > form > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > div > div > form > input');
    await page.click('#app > div > div > form > input');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'c');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'c');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.type('#app > div > div > form > input', 'c');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('#app > div > div > form > button');
    await page.click('#app > div > div > form > button');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(3)');
    await page.click('body > #app > div > div > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(4)');
    await page.click('body > #app > div > div > button:nth-child(4)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(2)');
    await page.click('body > #app > div > div > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > ul > li:nth-child(2)');
    await page.click('body > #app > div > ul > li:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(3)');
    await page.click('body > #app > div > div > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(4)');
    await page.click('body > #app > div > div > button:nth-child(4)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(2)');
    await page.click('body > #app > div > div > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > ul > li:nth-child(3)');
    await page.click('body > #app > div > ul > li:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(3)');
    await page.click('body > #app > div > div > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(4)');
    await page.click('body > #app > div > div > button:nth-child(4)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > ul > li:nth-child(1)');
    await page.click('body > #app > div > ul > li:nth-child(1)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(2)');
    await page.click('body > #app > div > div > button:nth-child(2)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(3)');
    await page.click('body > #app > div > div > button:nth-child(3)');
    expect(await page.evaluate(() => document.body.innerHTML)).toMatchSnapshot();
  });
});
