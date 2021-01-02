import './Contact.scss';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {contactMe} from '../../actions/userActions';

const Contact = ({contactMe}) => {
    const [sent, setSent] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        message: ""
    })
    const {email, message} = formData;

    const onSubmit = (e) => {
        e.preventDefault()
        contactMe(formData)
        setSent(true)
    }

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="contact-container">
            <h1>Contact Me</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                {sent ? 
                <h2>Thank you. <br/> Please give us 3-5 working days to reply.</h2>
                : 
                <Fragment>
                <input type="text" placeholder="Your Email" name="email" value={email} onChange={(e) => onChange(e)} minLength="5" required />
                <textarea type="text" placeholder="Your Message" name="message" value={message} onChange={(e) => onChange(e)} minLength="5" required />
                <br/>
                <button>Send</button>
                </Fragment>
                }
            </form>
        </div>
    )
}

export default connect(null, {contactMe})(Contact)
