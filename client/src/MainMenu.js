import React, {Component} from 'react';
import t from './t';

class MainMenu extends Component {
	render() {
		return (<div className="row justify-content-md-center">
			<div className="col-md-8 col-lg-6 mb-3">
				<div className="card card-body animated fadeIn">
					<h4 className="card-title display-4">IT-Викторина</h4>
					<p className="card-text">Отвечай на вопросы, занимай место в турнирной таблице по знанию азов отрасли и получай классные призы!</p>
					<div className="d-flex flex-column justify-content-center">
					<a href="/checkin"  className="btn btn-purple btn-rounded"><i className="fa fa-gamepad left"></i> {t('New game')}</a>
					<a href="/rating" className="btn btn-outline-purple btn-rounded"><i className="fa fa-group left"></i> {t('Players rating')}</a>
					</div>
				</div>
				{/* <div className="text-center">
					<h1 className="display-4 font-bold mb-5 Up">IT-Викторина</h1>
					<h5 className="mb-5 Up">Отвечай на вопросы, занимай место в турнирной таблице по знанию азов отрасли и получай классные призы!</h5>
					<a href="/checkin"  className="btn btn-purple btn-rounded"><i className="fa fa-gamepad left"></i> {t('New game')}</a>
					<a href="/rating" className="btn btn-outline-purple btn-rounded"><i className="fa fa-group left"></i> {t('Players rating')}</a>
				</div> */}
			</div>
		</div>);
	}

}

export default MainMenu;