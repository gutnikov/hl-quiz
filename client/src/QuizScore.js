import React from 'react';
import t from './t';

function QuizScore({player1, player2, player1Score, player2Score}) {
	return (<div className="quiz-score">
		<div className="player-score">{player1.name}: <br /> {player1Score}</div>
		<div className="player-score">{player2.name}: <br /> {player2Score}</div>
	</div>);
}

export default QuizScore;
