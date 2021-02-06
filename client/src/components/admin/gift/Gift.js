import './Gift.scss';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux'
import {createGiftCard, deleteExpiredGiftCards, getGiftCards} from '../../../actions/adminActions';

import {AiFillGift} from 'react-icons/ai';

const Gift = ({admin:{gift}, createGiftCard, deleteExpiredGiftCards, getGiftCards}) => {

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

            <div className="get-gift-cards">
                {!gift ? 
                <button onClick={() => getGiftCards()}>Find Gift Cards</button> 
                : 
                <Fragment>
                    <p>Total Gift Cards: {gift[1]}</p>
                    <p>Total Gift Card Balance: £{gift[0]}</p>
                </Fragment>
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

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {createGiftCard, deleteExpiredGiftCards, getGiftCards})(Gift)
