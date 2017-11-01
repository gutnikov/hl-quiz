import React, {Component} from 'react';
import QuestionsList from './QuestionsList';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';
import QuizAnswer from './QuizAnswer';
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

        var urlParams = new URLSearchParams(window.location.search);

        this.questions = new QuestionsList();

        const player1Id = urlParams.get('p1');
        const player2Id = urlParams.get('p2');

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
            player1: null,
            player2: null,
            // scores
            player1Score: 0,
            player2Score: 0,
            player1Answer: null,
            player2Answer: null,
            error: null,
            timeout: QUESTION_TIME_SEC,
        };
    }

    render() {
        return (
            <div className="row justify-content-stretch">
                <div className="col-md-12 mb-3 animated fadeIn">
                    <div className="quiz-container">{this.renderCurrentState()}</div>
                </div>
            </div>
        );
    }

    renderCurrentState() {
        // Any shit?
        if (this.state.error) {
            return this.renderError();
        }

        if (!this.state.player1 && !this.state.player2) {
            return this.renderLoading();
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
            {/* <QuizScore player1Score={this.state.player1Score} player2Score={this.state.player2Score}/> */}
            <QuizQuestion question={this.state.question} timeout={this.state.timeout}/>
        </div>);
    }

    renderAnswer() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="quiz">
                        {this.state.question.text}
                        <hr/>
                        <QuizScore player1Score={this.state.player1Score} player2Score={this.state.player2Score}/>
                        <hr/>
                        <QuizAnswer player1Answer={this.state.player1Answer} player2Answer={this.state.player2Answer}/>
                    </div>
                </div>
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
        }).then(function (res) {
            if (res.status === 200) {
                return res.json();
            }
        });
    }

    postResults() {
        this.postScore(this.state.player1Id, this.state.player1Score).then(p1 => {
            this.postScore(this.state.player2Id, this.state.player2Score).then(p2 => {
                this.setState({
                    player1Rating: p1.rating,
                    player2Rating: p2.rating
                });
            })
        });
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
        );
    }

    renderError() {
        return <div>{t('OMAGAT...an error')}</div>
    }

    renderLoading() {
        return <div className="loading">{t('Loading...')}</div>
    }

    componentDidMount() {
        fetch(`http://localhost:8080/players-info?p1Id=${this.state.player1Id}&p2Id=${this.state.player2Id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(result => {
            this.setState({
                player1: result.player1,
                player2: result.player2
            });

            this.listenToInput();
            this.setNextQuestion();
            this.setQuizTimer();
        });
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
            const [playerNumber, actionId] = action.split('-');
            this.onPlayerInput(Number(playerNumber), Number(actionId));
        }
    }


    unlistenFromInput() {
        clearInterval(this._gamepadUpdateToken);
        document.removeEventListener('keydown', this.keydownHanlder);
    }

    onPlayerInput(playerNumber, actionId) {
        // Not a question time?
        if (this.state.player1Answer.state !== ANSWER_PENDING ||
            this.state.player2Answer.state !== ANSWER_PENDING) {
            return;
        }

        const isRight = this.state.question.rightAnswer === actionId;
        const value = Number(this.state.question.value);

        const scoreKey = `player${playerNumber}Score`;
        const answerKey = `player${playerNumber}Answer`;

        let opponentScoreKey;

        if (playerNumber === 1) {
            opponentScoreKey = `player2Score`;
        } else {
            opponentScoreKey = `player1Score`;
        }

        this.setState({
            [answerKey]: {
                state: isRight ? ANSWER_RIGHT : ANSWER_WRONG,
                text: this.state.question.variants[actionId - 1]
            },
            [scoreKey]: this.state[scoreKey] + (isRight ? value : 0),
            [opponentScoreKey]: this.state[opponentScoreKey] + (isRight ? 0 : Number((value / 2).toFixed(1)))
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
                const playerNumber = gamepad.index + 1;

                gamepad.buttons.forEach((button, index) => {
                    if (button.pressed) {
                        console.info(`Pressed button ${index}`);

                        if (GAMEPAD_KEYS_INDEX[index]) {
                            this.onPlayerInput(playerNumber, GAMEPAD_KEYS_INDEX[index]);
                        }
                    }
                });
            }
        });
    }
}

export default Quiz;
