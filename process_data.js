const getQuestionContent = async text => {
	let result = text.replace("\n", "");
	return result.substring(0, result.indexOf("(A)"));
};

const getAnswersContent = async text => {
	let str = text.replace("\n", "");
	let answerStr = str.substring(str.indexOf("(A)"), str.length - 1);
	let answers = answerStr.split(/\([A-Z]\)/); // [ '', ' develops', ' developing', ' development', ' developed' ]

	answers = answers.filter(answer => answer.length > 0);
	answers = answers.map((answer, index) => ({
		content: answer.trim(),
		correct_answer: String.fromCharCode(index + "A".charCodeAt(0))
	}));
	return answers;
};

const processRawQuestions = async questions => {
	let result = [];
	questions.map((question, index) => {
		result.push({
			id: index,
			content: getQuestionContent(question.text),
			answers: getAnswersContent(question.text)
		});
	});
};

module.exports = {
	getAnswersContent,
	processRawQuestions
};
