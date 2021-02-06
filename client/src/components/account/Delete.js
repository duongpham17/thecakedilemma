import './Delete.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {MdDelete} from 'react-icons/md';
import {deleteAccount} from '../../actions/authActions';

const Delete = ({deleteAccount}) => {
    const [sure, setSure] = useState("")

    return (
        <div className="delete-account-container">
            <h2>Delete Account</h2>
            <form className={sure === "delete" ? "form-delete-ready" : ""}>
                <p>To delete account, type in " delete " below. </p><br/>
                <input type="text" placeholder="delete" onChange={(e) => setSure(e.target.value)} />
                <br/>
                {sure === "delete" ? 
                    <button onClick={() => deleteAccount()}><MdDelete/> Delete My Account</button>
                : ""}
            </form>
        </div>
    )
}

export default connect(null, {deleteAccount})(Delete)
