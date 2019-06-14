const {
	getQuestionContent,
	getAnswersContent,
	getRefinedAnswer
} = require("./utils");

const processRawQuestionData = data => {
	let result = [];
	data.map((item, index) => {
		result.push({
			id: index,
			content: getQuestionContent(item.question),
			answers: getAnswersContent(item.question),
			correct_answer: getRefinedAnswer(item.answer)
		});
	});
	return result;
};

module.exports = { processRawQuestionData };
