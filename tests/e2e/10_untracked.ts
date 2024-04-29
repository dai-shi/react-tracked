import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('10_untracked', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    // eslint-disable-next-line import/no-named-as-default-member
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(2) > input:nth-child(2)',
    );
    await page.click('body > #app > ul > li:nth-child(2) > input:nth-child(2)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > ul > li:nth-child(2) > input:nth-child(2)',
      '2',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(3) > input:nth-child(2)',
    );
    await page.click('body > #app > ul > li:nth-child(3) > input:nth-child(2)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type(
      'body > #app > ul > li:nth-child(3) > input:nth-child(2)',
      '3',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(2) > input:nth-child(1)',
    );
    await page.click('body > #app > ul > li:nth-child(2) > input:nth-child(1)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(3) > input:nth-child(1)',
    );
    await page.click('body > #app > ul > li:nth-child(3) > input:nth-child(1)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(1) > input:nth-child(1)',
    );
    await page.click('body > #app > ul > li:nth-child(1) > input:nth-child(1)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(2) > button:nth-child(4)',
    );
    await page.click(
      'body > #app > ul > li:nth-child(2) > button:nth-child(4)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(3) > button:nth-child(3)',
    );
    await page.click(
      'body > #app > ul > li:nth-child(3) > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(3) > input:nth-child(1)',
    );
    await page.click('body > #app > ul > li:nth-child(3) > input:nth-child(1)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > ul > li:nth-child(2) > button:nth-child(3)',
    );
    await page.click(
      'body > #app > ul > li:nth-child(2) > button:nth-child(3)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
