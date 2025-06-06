import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('15_reactmemoref', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    const browser = await puppeteer.launch({
      args: process.env.CI ? ['--no-sandbox'] : [],
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('body > #root > ul > li:nth-child(1) > input');
    await page.click('body > #root > ul > li:nth-child(1) > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > ul > li:nth-child(2) > input');
    await page.click('body > #root > ul > li:nth-child(2) > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > ul > li:nth-child(3) > input');
    await page.click('body > #root > ul > li:nth-child(3) > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > ul > li:nth-child(1) > input');
    await page.click('body > #root > ul > li:nth-child(1) > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > ul > li:nth-child(2) > input');
    await page.click('body > #root > ul > li:nth-child(2) > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > ul > li:nth-child(3) > input');
    await page.click('body > #root > ul > li:nth-child(3) > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
