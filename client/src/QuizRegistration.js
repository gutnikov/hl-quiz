import React, {Component} from 'react';
import UserLogin from './UserLogin';
import t from './t';
import {
    Link
} from 'react-router-dom';

function voidUser(id = null) {
    return {
        id: id,
        name: '',
        phone: '',
        error: null,
        registered: false
    };
}

const errorMarkup = function (text) {
    return (<span className="badge badge-pill red animated shake">{text}</span>);
};

class QuizRegistration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user1: voidUser(),
            user2: voidUser(),
            approve1: false,
            approve2: false
        };

        this.onFieldChange1 = this.onFieldChange.bind(this, 1);
        this.onFieldChange2 = this.onFieldChange.bind(this, 2);
    }

    render() {
        const bothRegistered = this.state.user1.registered && this.state.user2.registered;

        if (bothRegistered) {
            return <div className="animated zoomIn">
                <div className="animated pulse infinite">
                    <Link className="btn btn-unique waves-effect waves-light" style={{'transform': 'scale(2)'}} to={`/quiz?p1=${this.state.user1.id}&p2=${this.state.user2.id}`}>{t('Fight')}</Link>
                </div>
            </div>;
        } else {
            return <div className="row animated zoomIn">
                <div className="col-12 text-center mb-3">
                    <h3>Регистрация <span className="badge badge-pill red">ожидаем 2 участников</span></h3>
				</div>
                <UserLogin user={this.state.user1} approved={this.state.approve1} formId={1} img={'img/bi03.jpg'} onApprove={e=>this.onApprove(e, 1)} onSubmit={(e) => this.onSubmit(e, 1)} onFieldChange={this.onFieldChange1} onPhoneChange={ value => {this.onPhoneChange(1, value)} } userId={1} />
				<UserLogin user={this.state.user2} approved={this.state.approve2} formId={2} img={'img/eng02.jpg'} onApprove={e=>this.onApprove(e, 2)} onSubmit={(e) => this.onSubmit(e, 2)} onFieldChange={this.onFieldChange2} onPhoneChange={ value => {this.onPhoneChange(2, value)} } userId={4} />
			</div>;
        }
    }

    onApprove(event, formId) {
        this.setState({
            [`approve${formId}`]: !this.state[`approve${formId}`]
        });
    }

    onFieldChange(formId, event) {
        const {
            name,
            value
        } = event.target;

        this.setState({
            [`user${formId}`]: Object.assign({}, this.state[`user${formId}`], {
                [name]: value
            })
        });
    }

    onPhoneChange(formId, value) {
        this.setState({
            [`user${formId}`]: Object.assign({}, this.state[`user${formId}`], {
                ['phone']: value
            })
        });
    }

    onSubmit(e, formId) {
        e.preventDefault();

        // Try to register user...
        fetch('http://localhost:8080/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state[`user${formId}`].name,
                phone: this.state[`user${formId}`].phone
            })
        }).then(function(res) {
            switch (res.status) {
                case 400:
                    this.setError(formId, t('Form is invalid'));
                    break;
                case 409:
                    this.setError(formId, errorMarkup(t('Игрок уже зарегистрирован')));
                    break;
                case 201:
                    res.json().then(function(json) {
                        this.setState({
                            [`user${formId}`]: Object.assign({}, this.state[`user${formId}`], {
                                id: json.id,
                                error: null,
                                registered: true
                            })
                        });
                    }.bind(this));
                    break;
                default:
                    this.setError(formId, t('Response code is not supported') + `:${res.status}`);
                    break;
            }
        }.bind(this));
    }

    setError(formId, error) {
        this.setState({
            [`user${formId}`]: Object.assign({}, this.state[`user${formId}`], {
                error: error
            })
        });
    }

}

export default QuizRegistration;
