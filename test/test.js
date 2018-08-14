import 'chai/register-should';
import puppeteer from 'puppeteer';

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 10000,
};

before(async function() {
    global.browser = await puppeteer.launch(opts);
});

after(function() {
    global.browser.close();
    delete global.browser;
});

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            [1,2,3].indexOf(4).should.equal(-1);
        });
    });
});