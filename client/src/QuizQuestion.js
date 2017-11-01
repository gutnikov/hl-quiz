import React from 'react';
// import t from './t';

function QuizQuestion({question}) {
	return (<div className="card">
		{/* <hr /> */}
		<div className="card-header deep-orange lighten-1 white-text">
			<div className="quiz-question"> {/* {t('Question')}: */} {question.text} </div>
		</div>
		{/* <hr /> */}
		{/* <div className="quiz-value">{t('Value')}: {question.value}</div> */}
		{/* <div className="quiz-answer-variants">{t('Answer variants')}:</div> */}
		<div className="card-body">
			<div className="quiz-answer-variant row">	
			{
				question.variants.map(function(variant, index){
					return (<div className={(index === 1 || index === 2) ? "col-md-6 m-auto" : "col-md-12"} key={index}>
						{(index === 1 || index === 2) ? 
						<div className="" >
							<div className="chip">
								<div className="text-center">{/* {index+1}) */}{variant}</div>
							</div>
						</div> :  
						<div className="container">
							<div className="row">
								<div className="col-md-6 m-auto">
									<div className="chip">
										<div className="text-center">{/* {index+1}) */}{variant}</div>
									</div>
								</div>
							</div>
						</div>}
					</div>);
				})
			}
			</div>
		</div>
	</div>);
}

export default QuizQuestion;
