import './Account.scss';
import React from 'react';

import UserInfo from './UserInfo';
import Delete from './Delete';

const Account = () => { 

    return (
        <div className="account-container">
            <UserInfo />
            <Delete />
        </div>
    )
}

export default Account
