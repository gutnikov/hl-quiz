import questions from './_questions.json'

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

export default class {

	list;
	stopped;
	lastQuestionId;

	constructor() {
		const questionsList = questions.slice();

		shuffle(questionsList);

		this.list = questionsList;
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
