import React from 'react';
import t from './t';

function UserLogin(props) {
    const {
        name,
        phone,
        error,
        registered
    } = props.user;
    const canSubmit = name && name.trim().length && phone && phone.trim().length;

    if (registered) {
        return <div>
			<span>{t('Name')}: {name}</span>
			<span>{t('Phone')}: {phone}</span>
			<span>{t('Registered')}!</span>;
		</div>;
    } else {
        return <div className="col-6">
                    <div className="card">
                    <div>{error || ''}</div>
                    <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">Игрок</h4>
                        <form>
                            <div className="md-form">
                                <input type="text" value={name} name="name" onChange={props.onFieldChange} id="form-player-name" className="form-control" />
                                <label for="name">{t('Name')}</label>
                            </div>

                            <div className="md-form">
                                <input  type="text" value={phone} name="phone" onChange={props.onFieldChange} id="form-player-phone" className="form-control" />
                                <label for="phone">{t('Phone')}</label>
                            </div>

                            <div className="text-center">
                            <button className="btn btn-primary" type="button" onClick={props.onSubmit} disabled={canSubmit ? null : 'disabled'}>{t('Done')} <i className="fa fa-play ml-1"/></button>
                            </div>
                        </form>
                    </div>
                </div>
			<div>{error || ''}</div>
		</div>;
    }
}

export default UserLogin;
