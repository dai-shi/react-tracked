/* global page */

import { toMatchImageSnapshot } from 'jest-image-snapshot';

const port = process.env.PORT || '8080';
jest.setTimeout(15 * 1000);
expect.extend({ toMatchImageSnapshot });

describe('01_minimal', () => {
  it('should work with recorded events', async () => {
    await page.goto(`http://localhost:${port}/`);

    await page.setViewport({ width: 1129, height: 324 });

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(2)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(2) > div > button:nth-child(3)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(3) > div > button:nth-child(3)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(3) > div > button:nth-child(3)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button:nth-child(3)');
    await page.click('body > #app > div:nth-child(3) > div > button:nth-child(3)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(3) > div > button:nth-child(2)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(3) > div > button:nth-child(2)');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.waitForSelector('body > #app > div:nth-child(3) > div > button:nth-child(2)');
    await page.click('body > #app > div:nth-child(3) > div > button:nth-child(2)');
    await page.waitForSelector('body > #app > div:nth-child(5) > div > input');
    await page.click('body > #app > div:nth-child(5) > div > input');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.type('body > #app > div:nth-child(5) > div > input', '1');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.type('body > #app > div:nth-child(5) > div > input', '2');
    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.type('body > #app > div:nth-child(5) > div > input', '3');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
