import React, {Component} from 'react';

function QuizQuestionVariant({variant, iconPath, iconAlign, iconPosition}) {
	return (<div className="chip">
			<div className={iconAlign}>
				<img style={{order:iconPosition}} src={iconPath} />
				<div className="d-flex justify-content-center">
					<div className="m-2 align-self-center text-center">{variant}</div>
				</div>
			</div>
	</div>);
}

export default QuizQuestionVariant;
