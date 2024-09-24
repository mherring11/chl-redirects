const { test, expect } = require('@playwright/test');
const fs = require('fs');

const redirects = JSON.parse(fs.readFileSync('./redirects.json', 'utf-8'));

for (const { source, destination } of redirects) {
  test(`should redirect from ${source} to ${destination}`, async ({ page }) => {
    await page.goto(source, { waitUntil: 'domcontentloaded' });

    await page.waitForNavigation({ waitUntil: 'networkidle' });

    const finalURL = page.url();

    expect(finalURL).toBe(destination);
  });
}
