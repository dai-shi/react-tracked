import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

// this test is not very stable because of timer
describe('13_saga', () => {
  const port = process.env.PORT || '8080';
  const sleep = (ms: number) =>
    new Promise((r) => {
      setTimeout(r, ms);
    });

  it('should work with recorded events', async () => {
    // eslint-disable-next-line import/no-named-as-default-member
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #app > div > div:nth-child(3) > button');
    await page.click('body > #app > div > div:nth-child(3) > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await sleep(3000);
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector(
      'body > #app > div > div:nth-child(4) > button:nth-child(2)',
    );
    await page.click(
      'body > #app > div > div:nth-child(4) > button:nth-child(2)',
    );
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #app > div > div > button:nth-child(3)');
    await page.click('body > #app > div > div > button:nth-child(3)');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await sleep(1000);
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
