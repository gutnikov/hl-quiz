import React from 'react';
import * as cx from 'classnames';

// TODO: move to constants
const NO_ANSWER_YET = 0;
const ANSWER_RIGHT = 1;
const ANSWER_WRONG = 2;
const ANSWER_NONE = 3;

function QuizAnswer({player1Answer, player2Answer}) {
	return (<div className="player-answers">
		<div className={cx('player-answer', answerStateToClass(player1Answer.state))}>{player1Answer.text}</div>
		<div className={cx('player-answer', answerStateToClass(player2Answer.state))}>{player2Answer.text}</div>
	</div>);
}

function answerStateToClass(state) {
	switch(state) {
		case NO_ANSWER_YET: 
			return 'none';
		case ANSWER_RIGHT:
			return 'right';
		case ANSWER_WRONG:
			return 'wrong';
		case ANSWER_NONE:
			return 'none';
	}
}

export default QuizAnswer;
