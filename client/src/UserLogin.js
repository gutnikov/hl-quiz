import React from 'react';
import t from './t';
import Phone from 'react-phone-number-input';

import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';

function UserLogin(props) {
    const {
        name,
        phone,
        error,
        registered
    } = props.user;
    const canSubmit = name && name.trim().length && phone && phone.trim().length && props.approved;

    if (registered) {
        return (<div className="col-6">
            <div className="card animated bounceIn">
                <div className="card-body">
                    {/* <h5 className="pink-text"><i className="fa fa-cutlery"></i> {error || ''}</h5> */}
                    <h4 className="card-title">Игрок {name}</h4>
                    <p className="card-text"><i className="fa fa-phone"></i> {phone}</p>
                    <h4 className="card-title">{t('Registered')}!</h4>
                </div>
            </div>
        </div>);

    } else {
        return <div className="col-6">
            <div className="card">
                <img className="img-fluid" src={props.img} alt="Card cap" />
                <div className="card-body">
                    <h4 className="card-title"> {error || 'Игрок'}</h4>
                    <form onSubmit={props.onSubmit}>
                        <div className="md-form">
                        </div>
                        <div className="md-form">
                            <input tabIndex={props.userId} type="text" value={name} name="name" onChange={props.onFieldChange} id="form-player-name" className="form-control" />
                            <label htmlFor="name">{t('Name')}</label>
                        </div>

                        <div className="md-form">
                            <Phone
                                tabIndex={props.userId + 1}
                                country="RU"
                                placeholder="Ваш телефон"
                                onChange={ props.onPhoneChange }
                            />
                        </div>

                        <div className="md-form">
                            <input type="checkbox" id={`approve${props.formId}`} onChange={props.onApprove} checked={props.approved}/>
                            <label htmlFor={`approve${props.formId}`} className="h-approve">Даю согласие на обработку моих персональных данных</label>
                        </div>

                        <div className="text-center">
                        <button tabIndex={props.userId + 2} className="btn btn-primary" type="submit" onClick={props.onSubmit} disabled={canSubmit ? null : 'disabled'}>{t('Done')} <i className="fa fa-play ml-1"/></button>
                        </div>
                    </form>
                </div>
            </div>
		</div>;
    }
}

export default UserLogin;
