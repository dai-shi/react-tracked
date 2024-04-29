import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('05_container', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    // eslint-disable-next-line import/no-named-as-default-member
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector(
      'body > #app > div:nth-child(2) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(2) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(2) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(2) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(2) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(2) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(3) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(5) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(5) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(5) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(5) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(5) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(5) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    await page.click(
      'body > #app > div:nth-child(6) > div > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
