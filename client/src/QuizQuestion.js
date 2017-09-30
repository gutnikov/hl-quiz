import React from 'react';

function QuizQuestion({question}) {
	return (<div>
		<div>Question: {question.text}</div>
		<div>Answer variants:</div>	
		{
			question.variants.map(function(variant){
				return <div>{variant}</div>;
			})
		}
	</div>);
}

export default QuizQuestion;
