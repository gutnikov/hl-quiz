import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import t from './t';

class MainMenu extends Component {

	render() {
		return (
			<div>
				<div>
					<Link to='/rating'>{t('Players rating')}</Link>
				</div>
				<div>
					<Link to='/checkin'>{t('New game!')}</Link>
				</div>
			</div>
		);
	}

}

export default MainMenu;