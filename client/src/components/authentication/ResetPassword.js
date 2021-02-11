import './ResetPassword.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alertActions';
import {resetPassword} from '../../actions/authActions';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'

const ResetPassword = ({resetPassword, location, setAlert, auth:{loggedOn}}) => {
    const [see, setSee] = useState(false)
    const [pass, setPass] = useState({
        password: "",
        confirmPassword: ""
    })

    const {password, confirmPassword} = pass;

    const onSubmit = (e) => {
        e.preventDefault()
        if(password === confirmPassword){
            resetPassword(location.pathname.slice(15, 100), password)
        } else {
            setAlert("Password and Confirm Password is incorrect", 'primary')
        }
    }

    if(loggedOn){
       return <Redirect to='/' />
    }

    return (
        <div className="reset-password-container">
            <form onSubmit={(e) => onSubmit(e)}>
                <button className="eyes" type="button" onClick={() => setSee(!see)}>{see ? <AiOutlineEye className="icon_s_white"/> : <AiOutlineEyeInvisible className="icon_s_white"/>}</button><br/>
                <input minLength="8" type={see === true ? "text" : "password"} placeholder="New Password" onChange={e => setPass({...pass, password: e.target.value})} required/><br/>
                <input minLength="8" type={see === true ? "text" : "password"} placeholder="Confirm New Password" onChange={e => setPass({...pass, confirmPassword: e.target.value})} required/><br/>

                <button className="update-pass-btn"> Update</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {resetPassword, setAlert})(ResetPassword)