import React, {Component} from 'react';
import t from './t';

class MainMenu extends Component {
	render() {
		return (
			<div className="row justify-content-md-center ">
				<div className="col-md-8 col-lg-6 mb-3 animated fadeIn">
					<div className="text-center">
						<ul>
							<li>
								<h1 className="display-4 font-bold mb-5 Up">IT-Викторина</h1></li>
							<li>
								<h5 className="mb-5 Up">Отвечай на вопросы, занимай место в турнирной таблице по знанию азов отрасли и получай классные призы!</h5>
							</li>
							<li>
								<a href="/checkin"  className="btn btn-purple btn-rounded"><i className="fa fa-gamepad left"></i> {t('New game!')}</a>
							</li>
							<li>
								<a href="/rating" className="btn btn-outline-purple btn-rounded"><i className="fa fa-group left"></i> {t('Players rating')}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

}

export default MainMenu;