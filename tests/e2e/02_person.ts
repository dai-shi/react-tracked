import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('02_typescript', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    const browser = await puppeteer.launch();
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
      '#root > div:nth-child(5) > div > div > button:nth-child(2)',
    );
    await page.click(
      '#root > div:nth-child(5) > div > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      '#root > div:nth-child(5) > div > div > button:nth-child(2)',
    );
    await page.click(
      '#root > div:nth-child(5) > div > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      '#root > div:nth-child(5) > div > div > button:nth-child(3)',
    );
    await page.click(
      '#root > div:nth-child(5) > div > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      '#root > div:nth-child(5) > div > div > button:nth-child(3)',
    );
    await page.click(
      '#root > div:nth-child(5) > div > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #root > div:nth-child(5) > div:nth-child(2) > input',
    );
    await page.click(
      'body > #root > div:nth-child(5) > div:nth-child(2) > input',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(2) > input',
      'a',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(2) > input',
      'b',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(2) > input',
      'c',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(3) > input',
      'd',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(3) > input',
      'e',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(3) > input',
      'f',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(4) > input',
      '1',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(4) > input',
      '2',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #root > div:nth-child(5) > div:nth-child(4) > input',
      '3',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
