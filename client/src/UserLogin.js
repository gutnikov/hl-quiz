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
        return <div>
			<div>{error || ''}</div>
			<label>{t('Name')}: <input type="text" value={name} name="name" onChange={props.onFieldChange}/></label>
			<label>{t('Phone')}: <input type="text" value={phone} name="phone" onChange={props.onFieldChange}/></label>
			<button type="button" onClick={props.onSubmit} disabled={canSubmit ? null : 'disabled'}>{t('Done')}</button>
		</div>;
    }
}

export default UserLogin;
