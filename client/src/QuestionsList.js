const questions = [
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		variants: [
			'adipiscing', // 0
			'consectetur', // 1
			'eiusmod', // 2
			'dolor'	// 3
		],
		answer: 1
	},
	{
		text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
		variants: [
			'veniam',
			'nostrud',
			'velit',
			'laborum'	
		],
		answer: 2
	},
	{
		text: 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
		variants: [
			'est',
			'Duis',
			'Excepteur',
			'dolore'	
		],
		answer: 3
	}
];

export default class {

	list;
	lastQuestionId;

	constructor() {
		this.list = questions.slice();
		this.lastQuestionId = -1;
	}

	getNextQuestion() {
		// TODO: implement it 
		if (this.lastQuestionId >= this.list.length) {
			return null;
		}
		return this.list[++this.lastQuestionId];
	}
};
