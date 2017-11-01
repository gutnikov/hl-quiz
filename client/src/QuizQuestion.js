import React from 'react';
import Countdown from './Countdown';
import QuizQuestionVariant from './QuizQuestionVariant';
// import t from './t';

function QuizQuestion({question, timeout}) {
	return (<div className="card">
		<div className="card-header secondary-color-dark white-text">
			<div className="quiz-question"> {/* {t('Question')}: */} {question.text} </div>
		</div>
		{/* <div className="quiz-value">{t('Value')}: {question.value}</div> */}
		{/* <div className="quiz-answer-variants">{t('Answer variants')}:</div> */}
		<div className="card-body">
			<div className="quiz-answer-variant row">	
			{
				question.variants.map(function(variant, index){
					return (<div className={(index === 1 || index === 2) ? "col-md-6 m-auto" : "col-md-12"} key={index}>
						{(index === 1 || index === 2) ? 
						<QuizQuestionVariant variant={variant}/> :  
						<div className="container">
							<div className="row">
								<div className="col-md-6 m-auto">
									<QuizQuestionVariant variant={variant}/>
								</div>
							</div>
						</div>}
					</div>);
				})
			}
			</div>
			<Countdown value={timeout} color={'secondary-color-dark'}/>
		</div>
	</div>);
}

export default QuizQuestion;
