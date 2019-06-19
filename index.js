const { getDataFromUrl } = require("./scrape");
const { writeToFile, initResultFolder } = require("./utils");
const { processRawQuestionData } = require("./process_data");

const siteUrl =
	"https://quizlet.com/412230019/toeic-practice-test-with-key-and-explanation-flash-cards/";

const writeResultData = async data => {
	try {
		const result = processRawQuestionData(data);
		writeToFile("question_bank.json", result);
	} catch (err) {
		console.log(err);
	}
};

void (async () => {
	try {
		initResultFolder();
		const COMMON_SELECTOR = "div.SetPageTerm-content";

		let data = await getDataFromUrl(siteUrl, COMMON_SELECTOR);
		await writeResultData(data);
	} catch (err) {
		console.log(err);
	}
})();
