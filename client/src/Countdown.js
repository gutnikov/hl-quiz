import React, {Component} from 'react';
import t from './t';

class Countdown extends Component {

	interval = 1000;

	constructor(props) {
		super(props);
		this.state = {
			value: props.value * 1000
		};
	}

	render() {
		return <div>{t('Time to answer')} : {this.state.value/1000}</div>
	}

	componentDidMount() {
		this.intervalId = setInterval(function() {
			this.setState({
				value: Math.max(this.state.value - this.interval, 0)
			});
		}.bind(this), this.interval);	
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);	
	}
}

export default Countdown;
