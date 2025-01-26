import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('07_todolist', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    const browser = await puppeteer.launch({
      args: process.env.CI ? ['--no-sandbox'] : [],
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('#root > div > div > form > input');
    await page.click('#root > div > div > form > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'a');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'a');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'a');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > div > div > form > button');
    await page.click('#root > div > div > form > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > div > div > form > input');
    await page.click('#root > div > div > form > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'b');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'b');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'b');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > div > div > form > button');
    await page.click('#root > div > div > form > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > div > div > form > input');
    await page.click('#root > div > div > form > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'c');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'c');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > div > div > form > input', 'c');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > div > div > form > button');
    await page.click('#root > div > div > form > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(3)',
    );
    await page.click('body > #root > div > div > button:nth-child(3)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(4)',
    );
    await page.click('body > #root > div > div > button:nth-child(4)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(2)',
    );
    await page.click('body > #root > div > div > button:nth-child(2)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > div > ul > li:nth-child(2)');
    await page.click('body > #root > div > ul > li:nth-child(2)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(3)',
    );
    await page.click('body > #root > div > div > button:nth-child(3)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(4)',
    );
    await page.click('body > #root > div > div > button:nth-child(4)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(2)',
    );
    await page.click('body > #root > div > div > button:nth-child(2)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > div > ul > li:nth-child(3)');
    await page.click('body > #root > div > ul > li:nth-child(3)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(3)',
    );
    await page.click('body > #root > div > div > button:nth-child(3)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(4)',
    );
    await page.click('body > #root > div > div > button:nth-child(4)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > div > ul > li:nth-child(1)');
    await page.click('body > #root > div > ul > li:nth-child(1)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(2)',
    );
    await page.click('body > #root > div > div > button:nth-child(2)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div > div > button:nth-child(3)',
    );
    await page.click('body > #root > div > div > button:nth-child(3)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
