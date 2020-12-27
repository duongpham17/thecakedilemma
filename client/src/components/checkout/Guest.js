import './Guest.scss';
import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {MdKeyboardArrowRight} from 'react-icons/md';

import {signup, signupConfirm} from '../../actions/authActions';
import {setAlert} from '../../actions/alertActions';

const Guest = ({auth:{loggedOn, confirm}, signup, signupConfirm, setAlert}) => {

    const [see, setSee] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        user: "",
        password: "",
        passwordConfirm: "",
        code: (10000 + Math.random() * 99999).toFixed(0),
        code_confirm: "",
    })

    const {email, user, password, passwordConfirm, code_confirm, code} = formData

    const onSubmit = (e, type) => {
        e.preventDefault()
        if(type === "verify"){
            if(password !== passwordConfirm){
                setAlert("Passwords Don't Match.", "danger")
            } else {
                signup(formData)
            }
        }

        if(type === "confirm"){
            if(code_confirm !== code){
                setAlert("The code does not match", "danger")
            } else {
                signupConfirm(formData)
            }
        }
    }
    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    if(loggedOn){
        return <Redirect to="/checkout" />
    }

    return (
        <div className="guest-checkout-container">
            {!confirm ? 
            <Fragment>
            <div className="guest-content">
                <button><Link to="/checkout">Continue as guest <MdKeyboardArrowRight className="icon"/></Link></button>
            </div>
            <div className="sign-up-content">
                <form onSubmit={(e) => onSubmit(e, "verify")}>
                    <p className="title">Sign up to check the progress of your orders.</p>
                    <p>Email</p>
                    <input type="email" name="email" value={email}  onChange={e => onChange(e) } required minLength="4" maxLength="45"  />
                    <p>Username</p>
                    <input type="text"  name="user" value={user}     onChange={e => onChange(e) }  required minLength="4" maxLength="22" />
                    <p className="see" onClick={() => setSee(!see) }>{see ?  <AiFillEye/> : <AiFillEyeInvisible/> } Password</p>
                    <input type={see ? 'text' : 'password'} className={password === passwordConfirm && password.length === 8 ? "correct" : ""}  name="password" value={password} onChange={e => onChange(e) } required minLength="8"  maxLength="45"/>
                    <p>Password Confirm</p>
                    <input type={see ? 'text' : 'password'} className={password === passwordConfirm && password.length === 8 ? "correct" : ""}  name="passwordConfirm" value={passwordConfirm} onChange={e => onChange(e) } required minLength="8" maxLength="45" />
                    <br/>
                    <button>Sign Up</button>
                </form>
            </div>
            </Fragment>
            : 
            <div className="sign-up-confirm-content">
            <form onSubmit={e => onSubmit(e, "confirm")} >
                <h2>Please check <br/> {formData.email} <br/> for the code.</h2>
                <input type="text" placeholder="Enter code here" name="code_confirm" value={code_confirm} onChange={(e) => onChange(e) }  />
                <br/>
                <button>Confirm</button>
            </form>
            </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {signup, setAlert, signupConfirm})(Guest)
