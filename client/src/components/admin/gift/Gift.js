import './Gift.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux'
import {createGiftCard, deleteExpiredGiftCards} from '../../../actions/adminActions';

import {AiFillGift} from 'react-icons/ai';

const Gift = ({createGiftCard, deleteExpiredGiftCards}) => {

    const [giftDelete, setDeleteGift] = useState("")
    const [sent, setSent] = useState("processing")

    const [formData, setFormData] = useState({
        balance: "",
        user_email: "",
        name: "The Cake Dilemma",
        message: "Enjoy this gift card on us, thank you for being a loyal customer and supporting our small business!",
    })
    const {balance, user_email, name, message} = formData;

    const onSubmit = (e) => {
        e.preventDefault()
        setSent("loading")
        setTimeout(() => { 
            setSent("done")
            createGiftCard(formData)
            setFormData({
                balance: "",
                user_email: "",
                name: "The Cake Dilemma",
                message: "Enjoy this gift card on us, thank you for being a loyal customer and supporting our small business!",
            })
        }, 3000)
    }

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

    const deleteExpiredGifts = (e) => {
        e.preventDefault();
        setDeleteGift("success");
        deleteExpiredGiftCards()
    }

    return (
        <div className="admin-gift-container">

            <div className="delete-gift-card-epxired">
                {giftDelete === "success" ? 
                <button>Success</button> : 
                <button onClick={(e) => deleteExpiredGifts(e)}>Delete Gift Cards that has expired</button>
                }
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <small>Name:</small>
                <input type="text" name="name" value={name} onChange={(e) => onChange(e)} required /><br/>
                <small>User Email:</small>
                <input type="email" name="user_email" value={user_email} placeholder="send to" onChange={(e) => onChange(e)} required /><br/>
                <small>Balance:</small>
                <input name="balance" value={balance} placeholder="Enter amount" onChange={(e) => onChange(e)} required /><br/>
                <small>Message:</small>
                <textarea type="text" name="message" value={message} onChange={(e) => onChange(e)} required /> <br/>
                {sent === "loading" ? 
                <p className="gift-is-loading"><AiFillGift/></p> 
                :
                sent === "done" ? 
                <button type="button" className="gift-again-btn" onClick={() => setSent("processing")}>Send another gift?</button>
                :
                <button><AiFillGift/></button>
                }
            </form>
        </div>
    )
}

export default connect(null,{createGiftCard, deleteExpiredGiftCards})(Gift)
