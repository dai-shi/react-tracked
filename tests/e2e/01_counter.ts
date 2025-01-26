import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('01_minimal', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    const browser = await puppeteer.launch({
      args: process.env.CI ? ['--no-sandbox'] : [],
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector(
      'body > #root > div:nth-child(2) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #root > div:nth-child(2) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(2) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #root > div:nth-child(2) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(2) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #root > div:nth-child(2) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(2) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #root > div:nth-child(2) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(2) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #root > div:nth-child(2) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(2) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #root > div:nth-child(2) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #root > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #root > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #root > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(3) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #root > div:nth-child(3) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(3) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #root > div:nth-child(3) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(3) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #root > div:nth-child(3) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > div:nth-child(5) > div > input');
    await page.click('body > #root > div:nth-child(5) > div > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('body > #root > div:nth-child(5) > div > input', '1');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('body > #root > div:nth-child(5) > div > input', '2');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('body > #root > div:nth-child(5) > div > input', '3');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
