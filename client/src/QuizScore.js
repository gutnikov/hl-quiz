import React from 'react';
import t from './t';

function QuizScore({player1Score, player2Score}) {
	return (<div className="quiz-score">
		<div className="player-score">{t('Player 1 score')}: {player1Score}</div>
		<div className="player-score">{t('Player 2 score')}: {player2Score}</div>
	</div>);
}

export default QuizScore;
