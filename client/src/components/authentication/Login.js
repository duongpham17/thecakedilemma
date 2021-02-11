import './authentication.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {login} from '../../actions/authActions';

const Login = ({login, auth:{loggedOn}}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password} = formData

    const onSubmit = e => {
        e.preventDefault()
        login(formData)
    }

    if(loggedOn){
        return <Redirect to='/' />
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="authentication-container">
            <form onSubmit={e => onSubmit(e)}>
                <h2>Login</h2>
                <input type="text" placeholder="Email"  name="email" value={email} onChange={e => onChange(e) }  required minLength="4" />
                <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e) } required minLength="8"  maxLength="1000"/>
                <button>Login</button>
                
                <div className="link-to">
                <Link to="/forgot password">Forgot Password?</Link>
                <small> or </small>
                <Link to="/signup">Create Account?</Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {login})(Login)
