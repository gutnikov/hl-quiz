import React from 'react';
import Countdown from './Countdown';
import QuizQuestionVariant from './QuizQuestionVariant';
// import t from './t';

function QuizQuestion({question, timeout}) {
	return (<div className="card animated fadeIn">
		<div className="card-header secondary-color-dark white-text">
			<h2 className="quiz-question"> {/* {t('Question')}: */} {question.text} </h2>
		</div>
		{/* <div className="quiz-value">{t('Value')}: {question.value}</div> */}
		{/* <div className="quiz-answer-variants">{t('Answer variants')}:</div> */}
		<div className="card-body">
			<div className="quiz-answer-variant row">	
			{
				question.variants.map(function(variant, index){
					var icon = (index === 0 ) ? 
						"img/ps-controls/triangle.svg" : 
					(index === 1 ) ? 
						"img/ps-controls/square.svg" : 
					(index === 2 ) ? 
						"img/ps-controls/circle.svg" : 
						"img/ps-controls/cross.svg"
					;

					var iconPosition = (index === 0 || index === 1 ) ? 1 : 0 ;

					return (<div className={(index === 1 || index === 2) ? "col-md-6 m-auto" : "col-md-12"} key={index}>
						{(index === 1) ? 
							<QuizQuestionVariant variant={variant} iconPath={icon} iconAlign={"d-flex flex-row justify-content-end"} iconPosition={iconPosition} /> :  
						(index === 2) ?
							<QuizQuestionVariant variant={variant} iconPath={icon} iconAlign={"d-flex flex-row"} iconPosition={iconPosition} /> :  
						<div className="container">
							<div className="row">
								<div className="col-md-6 m-auto">
									<QuizQuestionVariant variant={variant} iconPath={icon} iconAlign={"d-flex flex-column"} iconPosition={iconPosition} />
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
