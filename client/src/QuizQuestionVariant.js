import React, {Component} from 'react';

function QuizQuestionVariant({variant}) {
	return (<div className="chip">
		<div className="text-center">{variant}</div>
	</div>);
}

export default QuizQuestionVariant;
