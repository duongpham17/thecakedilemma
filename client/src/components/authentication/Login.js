import './authentication.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {login} from '../../actions/authActions';

import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const Login = ({login, auth:{loggedOn}}) => {

    const [see, setSee] = useState(false)

    const [formData, setFormData] = useState({
        user: "",
        password: "",
    })

    const {user, password} = formData

    const onSubmit = e => {
        e.preventDefault()
        if(user.includes("@")){
            login(formData, "email")
        } else {
            login(formData, "username")
        }
    }

    if(loggedOn){
        return <Redirect to='/' />
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="authentication-container">
            <form onSubmit={e => onSubmit(e)}>
                <h2>Login</h2>
                <p>Username or Email</p>
                <input type="text"  name="user" value={user} onChange={e => onChange(e) }  required minLength="4" maxLength="22" />
                <p className="see" onClick={() => setSee(!see) }>{see ?  <AiFillEye className="icon_s_white"/> : <AiFillEyeInvisible className="icon_s_white"/> } Password</p>
                <input type={see ? 'text' : 'password'} name="password" value={password} onChange={e => onChange(e) } required minLength="8"  maxLength="45"/>
                <button>Login</button>
                
                <div className="link-to">
                <Link to="/forgot password">Forgot Password?</Link>
                <br/><br/>
                <Link to="/signup">Create account? Signup</Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {login})(Login)
