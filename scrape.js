const puppeteer = require("puppeteer");

const getDataFromUrl = async (url, commonSelector) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url);

	const result = await page.evaluate(mySelector => {
		const grabFromRow = (row, selector) =>
			row.querySelector(selector).innerText.trim();

		let data = [];
		let dataRows = document.querySelectorAll(mySelector);
		const QUESTION_SELECTOR = "a.SetPageTerm-wordText";
		const ANSWER_SELECTOR = "span.TermText.notranslate.lang-vi";

		for (const row of dataRows) {
			data.push({
				question: grabFromRow(row, QUESTION_SELECTOR),
				answer: grabFromRow(row, ANSWER_SELECTOR)
			});
		}
		return data;
	}, commonSelector); // commonSelector will be passed into page.evaluate function as argument "mySelector"

	await browser.close();
	return result;
};

module.exports = {
	getDataFromUrl
};
