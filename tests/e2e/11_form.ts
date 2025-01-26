import { describe, expect, it } from 'vitest';
import puppeteer from 'puppeteer';

describe('11_form', () => {
  const port = process.env.PORT || '8080';

  it('should work with recorded events', async () => {
    const browser = await puppeteer.launch({
      args: process.env.CI ? ['--no-sandbox'] : [],
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);

    await page.waitForSelector('#root > form > div:nth-child(3) > div > input');
    await page.click('#root > form > div:nth-child(3) > div > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > form > div:nth-child(3) > div > input', '1');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > form > div:nth-child(3) > div > input', '1');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > form > div:nth-child(3) > div > input', '1');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > form > div:nth-child(5) > div > input', '2');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > form > div:nth-child(5) > div > input', '2');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.type('#root > form > div:nth-child(5) > div > input', '2');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > form > div > div > select');
    await page.click('#root > form > div > div > select');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.select('#root > form > div > div > select', 'male');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('#root > form > div:nth-child(9) > div > input');
    await page.click('#root > form > div:nth-child(9) > div > input');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await page.waitForSelector('body > #root > form > button');
    await page.click('body > #root > form > button');
    expect(
      await page.evaluate(() => document.body.innerHTML),
    ).toMatchSnapshot();

    await browser.close();
  });
});
