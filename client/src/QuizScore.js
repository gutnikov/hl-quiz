import React from 'react';
import t from './t';

function QuizScore({player1, player2, player1Score, player2Score}) {
	return (<div className="quiz-score d-flex align-items-center">
		<div className="player-score">
			<div className="card animated flipInX">
				<h2 className="display-2 p-3">{player1Score}</h2>
			</div>
		</div>
		<div className="player-score">
			<h1 className="display-1">:</h1>
		</div>
		<div className="player-score">
			<div className="card animated flipInX">
				<h2 className="display-2 p-3">{player2Score}</h2>
			</div>
		</div>
	</div>);
}

export default QuizScore;
