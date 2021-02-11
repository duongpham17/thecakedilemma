import './ForgotPassword.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import { forgottenPassword } from "../../actions/authActions";

const ForgotLogin = ({forgottenPassword, auth:{sent}}) => {

    const [loading, setLoading] = useState(false)
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            forgottenPassword(forgotPasswordEmail);
            setLoading(false)
        }, 2000);
    }

    return (
        <div className="forgotten-password-container">
            {!sent ? 
            <form onSubmit={(e) => onSubmit(e) }>
            <h2>Forgotten Password</h2>
            <input minLength="6" type="email" placeholder="Enter Your Email" onChange={e => setForgotPasswordEmail(e.target.value)} required /><br/>
            {loading ? <div className="loading_4"></div> :
                <button>Send</button>
            }
            </form>
            :
            <p>Email has been sent to: {forgotPasswordEmail}. Please check junk aswell.</p>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {forgottenPassword})(ForgotLogin)