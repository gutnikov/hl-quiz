import questions from './_questions.json'

export default class {

	list;
	stopped;
	lastQuestionId;

	constructor() {
		this.list = questions.slice();
		this.lastQuestionId = -1;
		this.stopped = false;
	}

	stop() {
		this.stopped = true;
	}

	getNextQuestion() {
		// TODO: implement it 
		if (this.stopped || this.lastQuestionId >= this.list.length) {
			return null;
		}
		return this.list[++this.lastQuestionId];
	}

};
