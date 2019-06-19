const fs = require("fs");
const resultFolder = "./result";

const getQuestionContent = text => {
	let result = text.replace("\n", "");
	return result.substring(0, result.indexOf("(A)"));
};

const getAnswersContent = text => {
	let str = text.replace("\n", "");
	let answerStr = str.substring(str.indexOf("(A)"), str.length);
	let answers = answerStr.split(/\([A-Z]\)/); // [ '', ' develops', ' developing', ' development', ' developed' ]

	answers = answers.filter(answer => answer.length > 0);
	answers = answers.map((answer, index) => ({
		content: answer.trim(),
		key: String.fromCharCode(index + "A".charCodeAt(0))
	}));
	return answers;
};

const getRefinedAnswer = text => {
	text = text.substring(0, 9);
	return text.substr(-1);
};

const writeToFile = async (fileName, data) => {
	fs.writeFile(
		`${resultFolder}/${fileName}`,
		JSON.stringify(data, null, 2),
		err => console.log(err)
	);
};

const initResultFolder = () => {
	if (!fs.existsSync(resultFolder)) {
		fs.mkdirSync(resultFolder);
	}
};

module.exports = {
	getQuestionContent,
	getAnswersContent,
	getRefinedAnswer,
	writeToFile,
	initResultFolder
};
