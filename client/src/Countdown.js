import React, {Component} from 'react';
// import t from './t';

class Countdown extends Component {
	interval = 1000;

	constructor(props) {
		super(props);
		this.state = {
			value: props.value * 1000,
			color: props.color
		};
	}

	render() {
		return (<div className="progress mt-3 mb-0">
			<div className={"progress-bar " + this.state.color} role="progressbar" style={{width: this.state.value/100 + '%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
		</div>);
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
