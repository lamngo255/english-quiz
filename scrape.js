const puppeteer = require("puppeteer");

const getDataFromUrl = async (url, selector) => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();
	await page.goto(url);

	const result = await page.evaluate(mySelector => {
		let elements = Array.from(document.querySelectorAll(mySelector));
		let result = elements.map((element, index) => ({
			id: index,
			text: element.innerText
		}));
		return result;
	}, selector);

	await browser.close();
	return result;
};

module.exports = {
	getDataFromUrl
};
