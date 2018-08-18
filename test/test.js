import 'chai/register-should';
import puppeteer from 'puppeteer';

const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000,
};

before(async function () {
  global.browser = await puppeteer.launch(opts);
});

after(function () {
  global.browser.close();
  delete global.browser;
});

describe('This test', function () {
  it('should work', async function () {
    await browser.version();

    true.should.be.true;
  });
});