import React from 'react';
import QuestionList from './questionList';
import QuizQuestion from './QuizQuestion';

const QUIZ_TIME_SEC = 20;
const QUESTION_TIME_SEC = 5;
const INDICATION_TIME_SEC = 1;

const NO_ANSWER_YET = 0;
const ANSWER_RIGHT = 1;
const ANSWER_WRONG = 2;
const ANSWER_NONE = 3;

class Quiz extends Component {

	questionTimerId = null;
	indicationTimerId = null;

	rightScoreTo = {
		1: [1, 0],
		2: [0, 1]
	}

	wrongScoreTo = {
		1: [0, 1],
		2: [1, 0]
	}

	constructor(props) {
		super(props);

	    const match = props.location.search.match(/p1=(\d+)&p2=(\d+)/);
	    const [, player1Id, player2Id] = match;

		this.state = {
			question: null,
			curQuestionTimeLast: null,
			indicationTimeLast: null
			// ids
			player1Id: player1Id,
			player2Id: player2Id,
			// scores
			player1Score: 0,
			player2Score: 0,
			// right-wrong indication
			player1AnswerState: null,
			player2AnswerState: null,

			error: null,
		}
	}

	render() {
	    if (error) {
	        return <div>Wrong or missing player id</div>;
	    }

	    if (!question) {
	    	return <div>Ready?<div>
	    }

	    return <QuizQuestion/>
	}

	run() {
		this.setNextQuestion();
	}

	setNextQuestion() {
		this.questionTimerId = setTimeout(this.onQuestionTimedout.bind(this), QUESTION_TIME_SEC);
		this.setState({
			player1AnswerState: NO_ANSWER_YET,
			player2AnswerState: NO_ANSWER_YET,
			question: QuestionList.getNextQuestion()
		});
	}

	// No one answered?
	onQuestionTimedout() {
		this.setState({
			player1AnswerState: ANSWER_NONE,
			player2AnswerState: ANSWER_NONE
		});
		// Show answer status for a while
		this.setQuestionPause();
	}

	// Someone answered?
	onQuestionAnswer(playerId, isRight) {
		const [addTo1, addTo2] = (isRight ? this.rightScoreTo : this.wrongScoreTo)[playerId];
		this.setState({
			[`player${playerId}AnswerState`] = isRight ? ANSWER_RIGHT : ANSWER_WRONG,
			player1Score: this.state.player1Score + addTo1,
			player2Score: this.state.player2Score + addTo2
		});
		// Show answer status for a while
		this.setQuestionPause();
	}

	// Show answer statuses for a while
	setQuestionPause() {
		clearTimeout(this.questionTimerId);
		this.pauseTimerId = setTimeout(this.onPauseEnded.bind(this));
	}

	onPauseEnded() {
		clearTimeout(this.pauseTimerId);
		this.setNextQuestion();
	}
}

export default Quiz;
