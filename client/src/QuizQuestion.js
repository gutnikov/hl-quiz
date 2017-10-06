import React from 'react';
import t from './t';

function QuizQuestion({question}) {
	return (<div>
		<div className="quiz-question">{t('Question')}: {question.text}</div>
		<div className="quiz-answer-variants">{t('Answer variants')}:</div>	
		{
			question.variants.map(function(variant, index){
				return <div key={index} className="quiz-answer-variant">{index+1}) {variant}</div>;
			})
		}
	</div>);
}

export default QuizQuestion;
