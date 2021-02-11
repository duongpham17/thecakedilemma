import './UserInfo.scss';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {updateUserInfo} from '../../actions/userActions';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const UserInfo = ({user:{user}, updateUserInfo}) => {

    const [see, setSee] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordCurrent: ""
    })
    const {email, password, passwordCurrent} = formData;

    useEffect(() => {
        setFormData({
            email: !user ? "" : user.email
        })
    }, [setFormData, user])

    const onSubmit = (e) => {
        e.preventDefault()
        updateUserInfo(formData)
    }

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    return (
        <div className="user-info-container">
            <h2>Account Information</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <p className="see-password" onClick={() => setSee(!see)}>{see ? <AiFillEye className="icon_s_black"/> : <AiFillEyeInvisible className="icon_s_black"/>} Enter current password:</p>
                <input type={see ? "text" : "password"} name="passwordCurrent" value={passwordCurrent || ""} onChange={e => onChange(e)} minLength="8" required="" />

                <p>Email:</p>
                <input type="email" name="email" value={email} onChange={e => onChange(e)} required minLength="6" />

                <p className="see-password" onClick={() => setSee(!see)}>{see ? <AiFillEye className="icon_s_black"/> : <AiFillEyeInvisible className="icon_s_black" />} New Password:</p>
                <input type={see ? "text" : "password"} name="password" value={password || ""} onChange={e => onChange(e)} minLength="8" />

                <br/>
                {!passwordCurrent ? "" : passwordCurrent.length >= 8 ? <button>save</button> : ""}
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers
})

export default connect(mapStateToProps, {updateUserInfo})(UserInfo)
