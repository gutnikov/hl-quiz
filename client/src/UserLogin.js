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
        return <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 class="pink-text"><i class="fa fa-cutlery"></i> {error || ''}</h5>
                            <h4 className="card-title">Игрок</h4>
                            <p class="card-text">{name} c {phone}</p>
                            <h4 className="card-title">{t('Registered')}!</h4>
                        </div>
                    </div>
                </div>;

    } else {
        return <div className="col-6">
                    <div className="card">
                        <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" alt="Card cap" />
                        <div className="card-body">
                            <div className="view gradient-card-header blue-gradient">
                                <div class="red-text">
                                    {error || ''}
                                    <i class="close fa fa-times"></i>
                                </div>
                            </div>
                            <h4 className="card-title">Игрок</h4>
                            <form>
                                <div className="md-form">
                                    <input type="text" value={name} name="name" onChange={props.onFieldChange} id="form-player-name" className="form-control" />
                                    <label htmlFor="name">{t('Name')}</label>
                                </div>

                                <div className="md-form">
                                    <input type="text" value={phone} name="phone" onChange={props.onFieldChange} id="form-player-phone" className="form-control" />
                                    <label htmlFor="phone">{t('Phone')}</label>
                                </div>

                                <div className="text-center">
                                <button className="btn btn-primary" type="button" onClick={props.onSubmit} disabled={canSubmit ? null : 'disabled'}>{t('Done')} <i className="fa fa-play ml-1"/></button>
                                </div>
                            </form>
                        </div>
                    </div>
		</div>;
    }
}

export default UserLogin;
