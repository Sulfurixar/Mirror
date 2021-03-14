const puppeteer = require("puppeteer");

/**
 * @param url
 */
async function scrapeProduct(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x("/html/body/div[1]/div[3]/div/div[1]/div[3]/div/div[1]");
	console.log();

	browser.close();
}

scrapeProduct("https://www.err.ee/");
