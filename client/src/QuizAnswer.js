import React from 'react';
import * as cx from 'classnames';
import QuizScore from './QuizScore';

// TODO: move to constants
const NO_ANSWER_YET = 0;
const ANSWER_RIGHT = 1;
const ANSWER_WRONG = 2;
const ANSWER_NONE = 3;

function QuizAnswer({player1, player2, player1Answer, player2Answer, player1Score, player2Score}) {
	return (<div className="card card--answer animated fadeIn">
		<div className="card-body">
			<div className="quiz">
				{/* this.state.question.text */}
				<h1 className="display-2 text-center pt-4">Cчет</h1>
				<hr/>
				<QuizScore player1={player1} player2={player2} player1Score={player1Score} player2Score={player2Score}/>
				<hr/>
		
				<div className="quiz-answers flex-center">
					<h3 className={'section-heading' + cx('quiz-answer', answerStateToClass(player1Answer.state))}>{'Игрок ' + player1.name  + ' '} {(player1Answer.state  === 1) ? "ответил правильно!" : "ответил неверно!"}</h3>
					<h3 className={'section-heading' + cx('quiz-answer', answerStateToClass(player2Answer.state))}>{'Игрок ' + player2.name  + ' '} {(player2Answer.state  === 1) ? "ответил правильно!" : "ответил неверно!"}</h3>
					{(player1Answer.state === ANSWER_NONE && player2Answer.state === ANSWER_NONE) ? <h3 className="section-heading">Ничья</h3> : ''}
				</div>
			</div>
		</div>
	</div>);
}

function answerStateToClass(state) {
	switch(state) {
		case NO_ANSWER_YET: 
			return 'quiz-answer-pending is-hidden';
		case ANSWER_RIGHT:
			return 'quiz-answer-right';
		case ANSWER_WRONG:
			return 'quiz-answer-wrong';
		case ANSWER_NONE:
			return 'quiz-answer-none is-hidden';
		default:
			return 'quiz-answer-none is-hidden';
	}
}

export default QuizAnswer;
