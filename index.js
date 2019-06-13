const fs = require("fs");
const { getDataFromUrl } = require("./scrape");
const { getAnswersContent } = require("./process_data");

const siteUrl =
	"https://quizlet.com/129710150/toeic-practice-test-with-key-and-explanation-flash-cards/";

const writeToFile = async (fileName, data) => {
	fs.writeFile(fileName, JSON.stringify(data, null, 2), err =>
		console.log(err)
	);
};

void (async () => {
	// const QUESTION_SELECTOR = "a.SetPageTerm-wordText";
	// const ANSWER_SELECTOR = "span.TermText.notranslate.lang-vi";
	// const questions = await getDataFromUrl(siteUrl, QUESTION_SELECTOR);
	// const answers = await getDataFromUrl(siteUrl, ANSWER_SELECTOR);
	// writeToFile("./questions.json", questions);
	// writeToFile("./answers.json", answers);
})();
