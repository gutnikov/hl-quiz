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
    }
}

class QuizRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user1: voidUser(),
            user2: voidUser()
        };
        this.onSubmit1 = this.onSubmit.bind(this, 1);
        this.onFieldChange1 = this.onFieldChange.bind(this, 1);
        this.onSubmit2 = this.onSubmit.bind(this, 2);
        this.onFieldChange2 = this.onFieldChange.bind(this, 2);
    }

    render() {
        const bothRegistered = this.state.user1.registered && this.state.user2.registered;
        if (bothRegistered) {
            return <Link to={`/quiz?p1=${this.state.user1.id}&p2=${this.state.user2.id}`}>{t('Fight')}</Link>;
        } else {
            return <div>
				<UserLogin user={this.state.user1} onSubmit={this.onSubmit1} onFieldChange={this.onFieldChange1}/>
				<UserLogin user={this.state.user2} onSubmit={this.onSubmit2} onFieldChange={this.onFieldChange2}/>
			</div>;
        }
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

    onSubmit(formId) {
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
                    this.setError(formId, t('User already registered'));
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