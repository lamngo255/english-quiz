const {
	getQuestionContent,
	getAnswersContent,
	getRefinedAnswer
} = require("./utils");

const processRawQuestions = questions => {
	let result = [];
	questions.map((question, index) => {
		result.push({
			id: index,
			content: getQuestionContent(question.text),
			answers: getAnswersContent(question.text)
		});
	});
	return result;
};

const processRawAnswers = answers => {
	let result = [];
	answers.map((answer, index) => {
		result.push({
			id: index,
			correct_answer: getRefinedAnswer(answer.text)
		});
	});
	return result;
};

const mergeData = (questions, answers) => {
	let result = [];
	questions.map((question, index) => {
		result.push({
			...question,
			correct_answer: answers[index].correct_answer
		});
	});
	return result;
};

module.exports = {
	processRawQuestions,
	processRawAnswers,
	mergeData
};
