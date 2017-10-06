const questions = [
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		variants: [
			'adipiscing', // 1
			'consectetur', // 2
			'eiusmod', // 3
			'dolor'	// 4
		],
		rightAnswer: 1
	},
	{
		text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
		variants: [
			'veniam',
			'nostrud',
			'velit',
			'laborum'	
		],
		rightAnswer: 2
	},
	{
		text: 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
		variants: [
			'est',
			'Duis',
			'Excepteur',
			'dolore'	
		],
		rightAnswer: 3
	}
];

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
