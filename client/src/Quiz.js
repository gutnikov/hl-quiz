import React, {Component} from 'react';
import QuestionsList from './QuestionsList';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';
import QuizAnswer from './QuizAnswer';
import Countdown from './Countdown';
import {
    Link
} from 'react-router-dom';
import t from './t';

// How long the whole quest lasts
const QUIZ_TIME_SEC = 60;

// How much time to answer the question
const QUESTION_TIME_SEC = 10;

// How long users will be shown the result of answer ( pause between questions )
const PAUSE_TIME_SEC = 2;

// Waiting for answer
const ANSWER_PENDING = 0;

// Right/wrong
const ANSWER_RIGHT = 1;
const ANSWER_WRONG = 2;

// Havn't answered
const ANSWER_NONE = 3;

const KEY_MAP = {
	'1': '1-1',
	'2': '1-2',
	'3': '1-3',
	'4': '1-4',
	'h': '2-1',
	'j': '2-2',
	'k': '2-3',
	'l': '2-4'
};

const GAMEPAD_KEYS_INDEX = {
	3: 1,
	2: 2,
	1: 3,
	0: 4
};

class Quiz extends Component {

	questions = null;
	questionTimerId = null;
	indicationTimerId = null;

	rightScoreTo = {
		1: [1, 0],
		2: [0, 1]
	};

	wrongScoreTo = {
		1: [0, 1],
		2: [1, 0]
	};

	constructor(props) {
		super(props);

		this.questions = new QuestionsList();
	    const match = props.location.search.match(/p1=(\d+)&p2=(\d+)/);
	    const [, player1Id, player2Id] = match;

		this.state = {
			question: '',
			curQuestionTimeLast: null,
			indicationTimeLast: null,
			// ratings
			player1Rating: null,
			player2Rating: null,
			// ids
			player1Id: player1Id,
			player2Id: player2Id,
			// scores
			player1Score: 0,
			player2Score: 0,
			player1Answer: null,
			player2Answer: null,
			error: null,
		};
	}

	render() {
		return <div className="quiz-container">{this.renderCurrentState()}</div>;
	}

	renderCurrentState() {
		// Any shit?
		if (this.state.error) {
			return this.renderError();
		}

		if (this.state.player1Rating !== null && this.state.player2Rating !== null) {
			return this.renderScore();
		}
		// Current question
		else if (this.state.question) {
			// Somebody has an answer?
			if (this.state.player1Answer.state !== ANSWER_PENDING || this.state.player2Answer.state !== ANSWER_PENDING) {
				return this.renderAnswer();
			// Not yet?
			} else {
				return this.renderQuestion();
			}
		} 
		else {
			// Questions over?
			return this.renderSaveResults();
		}
	}

	renderQuestion() {
		return (<div className="quiz">
			<Countdown value={QUESTION_TIME_SEC}/>
			<QuizScore player1Score={this.state.player1Score} player2Score={this.state.player2Score}/>
			<QuizQuestion question={this.state.question}/>
		</div>);
	}

	renderAnswer() {
		return (<div className="quiz">
			<QuizScore player1Score={this.state.player1Score} player2Score={this.state.player2Score}/>
			<QuizQuestion question={this.state.question}/>;
			<QuizAnswer player1Answer={this.state.player1Answer} player2Answer={this.state.player2Answer}/>
		</div>);
	}

	renderSaveResults() {
		return <div>Saving results...</div>;	
	}

	postScore(id, score) {
        return fetch('http://localhost:8080/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
    			id,
    			score
    		})
        }).then(function(res) {
        	if (res.status === 200) {
	        	return res.json();
        	}
        });
	}

	postResults() {
		this.postScore(this.state.player1Id, this.state.player1Score).then(function(p1) {
			this.postScore(this.state.player2Id, this.state.player2Score).then(function(p2) {
				this.setState({
	        		player1Rating: p1.rating,
	        		player2Rating: p2.rating
				});
			}.bind(this));
		}.bind(this));
	}

	renderScore() {
		let winner;
		if (this.state.player1Score === this.state.player2Score) {
			winner = <div>{t('Draw')}</div>
		} else {
			winner = <div>{t('The winner is player')} {this.state.player1Score > this.state.player2Score ? 1 : 2}</div>;
		}
		return (
			<div>
			<div> {winner} </div>
			<div> {t('Player 1 rating')}: {this.state.player1Rating} </div>
			<div> {t('Player 2 rating')}: {this.state.player2Rating} </div>
			<Link to='/checkin'>{t('Go back to reg')}</Link>;
			</div>
		)
	}

	renderError() {
		return <div>{t('OMAGAT...an error')}</div>
	}

	componentDidMount() {
		this.listenToInput();
		this.setNextQuestion();
		this.setQuizTimer();
	}

	componentWillUnmount() {
		this.unlistenFromInput();	
	}

	setQuizTimer() {
		this.quizTimer = setTimeout(this.onQuizTimedout.bind(this), QUIZ_TIME_SEC * 1000);	
	}

	onQuizTimedout() {
		clearTimeout(this.quizTimer);
		this.questions.stop();
	}

	listenToInput() {
		this.keydownHanlder = this.keydownHanlder.bind(this);
		document.addEventListener('keydown', this.keydownHanlder);

        this._gamepadUpdateToken = setInterval(this._checkGamepadPressedButtons.bind(this), 100);
	}

	keydownHanlder(event) {
		const action = KEY_MAP[event.key];
		if (action) {
			const [playerId, actionId] = action.split('-');
			this.onPlayerInput(Number(playerId), Number(actionId));
		}
	}


	unlistenFromInput() {
		clearInterval(this._gamepadUpdateToken);
		document.removeEventListener('keydown', this.keydownHanlder);
	}

	onPlayerInput(playerId, actionId) {
		// Not a question time?
		if (this.state.player1Answer.state !== ANSWER_PENDING ||
			this.state.player2Answer.state !== ANSWER_PENDING) {
			return;	
		}

		const isRight = this.state.question.rightAnswer === actionId;
		const value = Number(this.state.question.value);

		const scoreKey = `player${playerId}Score`;
		const answerKey = `player${playerId}Answer`;

		this.setState({
			[answerKey] : {
				state: isRight ? ANSWER_RIGHT : ANSWER_WRONG,
				text: this.state.question.variants[actionId-1]
			},
			[scoreKey] : this.state[scoreKey] + (isRight ? value : 0)
		});

		this.setQuestionPause();
	}

	setNextQuestion() {
		const question = this.questions.getNextQuestion();
		this.setState({
			player1Answer: {
				state: ANSWER_PENDING,
				text: ''
			},
			player2Answer: {
				state: ANSWER_PENDING,
				text: ''
			},
			question: question
		});
		// If only stil have questions
		if (question) {
			this.questionTimerId = setTimeout(this.onQuestionTimedout.bind(this), QUESTION_TIME_SEC * 1000);
		} else {
			// Don't wait for the end of the quiz
			clearTimeout(this.quizTimer);
			this.unlistenFromInput();
			this.postResults();
		}
	}

	// No one answered?
	onQuestionTimedout() {
		this.setState({
			player1Answer: {
				state: ANSWER_NONE,
				text: t('No answer')
			},
			player2Answer: {
				state: ANSWER_NONE,
				text: t('No answer')
			}
		});
		// Show answer status for a while
		this.setQuestionPause();
	}

	// Someone answered?
	onQuestionAnswer(playerId, isRight) {
		const [addTo1, addTo2] = (isRight ? this.rightScoreTo : this.wrongScoreTo)[playerId];
		this.setState({
			[`player${playerId}AnswerState`]: isRight ? ANSWER_RIGHT : ANSWER_WRONG,
			player1Score: this.state.player1Score + addTo1,
			player2Score: this.state.player2Score + addTo2
		});
		// Show answer status for a while
		this.setQuestionPause();
	}

	// Show answer statuses for a while
	setQuestionPause() {
		clearTimeout(this.questionTimerId);
		this.pauseTimerId = setTimeout(this.onPauseEnded.bind(this), PAUSE_TIME_SEC * 1000);
	}

	onPauseEnded() {
		clearTimeout(this.pauseTimerId);
		this.setNextQuestion();
	}

    _checkGamepadPressedButtons() {
		Object.keys(navigator.getGamepads()).forEach(key => {
			const gamepad = navigator.getGamepads()[key];

        	if (gamepad) {
        		const playerId = gamepad.index + 1;

                gamepad.buttons.forEach((button, index) => {
                    if (button.pressed){
                        console.info(`Pressed button ${index}`);
                        this.onPlayerInput(playerId, GAMEPAD_KEYS_INDEX[index]);
                    }
                });
			}
		});
	}
}

export default Quiz;
