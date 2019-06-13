const { getDataFromUrl } = require("./scrape");
const { writeToFile, initResultFolder } = require("./utils");
const {
	processRawAnswers,
	processRawQuestions,
	mergeData
} = require("./process_data");

const siteUrl =
	"https://quizlet.com/129710150/toeic-practice-test-with-key-and-explanation-flash-cards/";

const writeResultData = async () => {
	try {
		let answers = require("./result/answers.json");
		let questions = require("./result/questions.json");

		answers = processRawAnswers(answers);
		questions = processRawQuestions(questions);
		const result = mergeData(questions, answers);
		writeToFile("question_bank.json", result);
	} catch (error) {
		console.log(error);
	}
};

void (async () => {
	initResultFolder();

	try {
		const QUESTION_SELECTOR = "a.SetPageTerm-wordText";
		const ANSWER_SELECTOR = "span.TermText.notranslate.lang-vi";
		const questions = await getDataFromUrl(siteUrl, QUESTION_SELECTOR);
		const answers = await getDataFromUrl(siteUrl, ANSWER_SELECTOR);

		await writeToFile("questions.json", questions);
		await writeToFile("answers.json", answers);

		// when the script has finished running, uncomment the next line, and comment the previous lines
		// await writeResultData();
	} catch (error) {
		console.log(error);
	}
})();
