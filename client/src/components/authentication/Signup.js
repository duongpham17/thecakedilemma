import './authentication.scss';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {signup, signupConfirm} from '../../actions/authActions';
import {setAlert} from '../../actions/alertActions';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const Signup = ({signup, signupConfirm, setAlert, auth:{loggedOn, confirm}}) => {

    const [see, setSee] = useState(false);
    const [check, setCheck] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        user: "",
        password: "",
        passwordConfirm: "",
        code: (10000 + Math.random() * 99999).toFixed(0),
        code_confirm: "",
    })

    const {email, user, password, passwordConfirm, code, code_confirm} = formData

    const onSubmit = (e, type) => {
        e.preventDefault()
        setCheck(true)
        if(type === "verify"){
            if(password !== passwordConfirm){
                setAlert("Passwords Don't Match.", "danger")
                setCheck(false)
            } else {
                signup(formData)
                setTimeout(function(){setCheck(false) }, 2000);
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

    if(loggedOn){
        return <Redirect to='/' />
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="authentication-container">
            <Fragment>
            {!confirm ?
            <form onSubmit={e => onSubmit(e, "verify")}>
                <h2>Creating Account</h2>
                <p>Email</p>
                <input type="email" name="email" value={email}  onChange={e => onChange(e) } required minLength="4" maxLength="45"  />
                <p>Username</p>
                <input type="text"  name="user" value={user}     onChange={e => onChange(e) }  required minLength="4" maxLength="22" />
                <p className="see" onClick={() => setSee(!see) }>{see ?  <AiFillEye/> : <AiFillEyeInvisible/> } Password</p>
                <input type={see ? 'text' : 'password'} className={password === passwordConfirm && password.length === 8 ? "correct" : ""}  name="password" value={password} onChange={e => onChange(e) } required minLength="8"  maxLength="45"/>
                <p>Password Confirm</p>
                <input type={see ? 'text' : 'password'} className={password === passwordConfirm && password.length === 8 ? "correct" : ""}  name="passwordConfirm" value={passwordConfirm} onChange={e => onChange(e) } required minLength="8" maxLength="45" />
                {check ? <Fragment><div className="loading_signup"/><br/><br/></Fragment> :
                    <button>Create</button>
                }

                <div className="link-to">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </form>
            : 
            <form className="confirm-email-content" onSubmit={e => onSubmit(e, "confirm")} >
            <h2>Please check <br/> {formData.email} <br/> for the code.</h2>
            <input type="text" placeholder="Enter code here" name="code_confirm" value={code_confirm} onChange={(e) => onChange(e) }  />
            <button>Confirm</button>
            </form>
            }
            </Fragment>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {signup, setAlert, signupConfirm})(Signup)
