import React from 'react';

function QuizQuestion({question}) {
	return (<div>
		<div className="quiz-question">Question: {question.text}</div>
		<div className="quiz-answers">Answer variants:</div>	
		{
			question.variants.map(function(variant, index){
				return <div className="quiz-answer">{index+1}) {variant}</div>;
			})
		}
	</div>);
}

export default QuizQuestion;
