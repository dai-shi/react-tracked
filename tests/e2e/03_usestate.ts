import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('03_usestate', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    // eslint-disable-next-line import/no-named-as-default-member
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button');
    await page.click('body > #app > div:nth-child(2) > div > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button');
    await page.click('body > #app > div:nth-child(2) > div > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button');
    await page.click('body > #app > div:nth-child(3) > div > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button');
    await page.click('body > #app > div:nth-child(3) > div > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button');
    await page.click('body > #app > div:nth-child(3) > div > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div:nth-child(5) > div:nth-child(1) > input',
    );
    await page.click(
      'body > #app > div:nth-child(5) > div:nth-child(1) > input',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(1) > input',
      'a',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(1) > input',
      'a',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(1) > input',
      'a',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(2) > input',
      'b',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(2) > input',
      'b',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(2) > input',
      'b',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(3) > input',
      '1',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(3) > input',
      '1',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > div:nth-child(5) > div:nth-child(3) > input',
      '1',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
