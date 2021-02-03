import './Gift.scss';
import React, { Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alertActions';

import {createGiftCardSession} from '../../actions/orderActions';

import {BsCircle, BsCircleFill} from 'react-icons/bs';
import {AiFillGift} from 'react-icons/ai';
import {BiRightArrowAlt, BiLeftArrowAlt} from 'react-icons/bi';

import {loadStripe} from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NODE_ENV === "production" ? process.env.REACT_APP_STRIPE_PUB_KEY_LIVE : process.env.REACT_APP_STRIPE_PUB_KEY)

const Gift = ({home:{data, loading}, order:{gift_card_session}, createGiftCardSession}) => {
    const gift_card_amount = data?.gift.split(" ").map(Number);

    const [done, setDone] = useState("")

    const [formData, setFormData] = useState({
        balance: 0,
        buyer_email: "",
        recipient_email: "",
        message: "",
        name: "",
    })
    const {balance, buyer_email, recipient_email, message, name} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

    //create all the information needed for the session which will include the 
    const onSubmit = (e) => {
        e.preventDefault();
        createGiftCardSession(formData)
        setDone("awaiting")
        setTimeout(() => {setDone(true)}, 2000)
    }

    console.log(formData)

    //start the session
    const handleClick = async (event) => {
      // Get Stripe.js instance
      const stripe = await stripePromise;

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: gift_card_session.id,
      });

      if (result.error) {
          setAlert("Something went wrong. Please reload.", "danger")
      }
    };

    return (
        <Fragment>
        {loading ? <div className="loading"/> : 
        <div className="gift-container">
            <h1>Gift Cards</h1>

            <div className="gift-content">
            {gift_card_amount.map((el, index) => 
                <button key={index+el} className="" onClick={() => setFormData({...formData, balance: el})}>
                {balance === el ? <BsCircleFill className="icon-selected"/>  : <BsCircle className="icon"/> }
                £{el}
                </button>
            )}

            {!balance ? "" :
            <div className="gift-card-content">
                <form onSubmit={(e) => onSubmit(e)}>
                    <h1>£{balance}</h1>
                    <label>Your Name</label> <br/>
                    <input type="text" placeholder="..." name="name" value={name} onChange={e => onChange(e)} minLength="2" required /><br/>
                    <label>Your Email</label> <br/>
                    <input type="email" placeholder="..." name="buyer_email" value={buyer_email} onChange={e => onChange(e)} minLength="5" required /><br/>
                    <label>Recipient's Email (optional) </label> <br/>
                    <input type="email" placeholder="..." name="recipient_email" value={recipient_email} onChange={e => onChange(e)}    /><br/>
                    <label>Message (optional) </label> <br/>
                    <textarea type="text" placeholder="Send a personal message with the gift card :)" name="message" value={message} onChange={e => onChange(e)} maxLength="1000"    /><br/>
                    <br/>

                    {done === "awaiting" ?
                    <div className="loading_3" />
                    :
                    done
                    ?
                    <button type="button" className="buy-gift-card" role="link" onClick={handleClick}><BiRightArrowAlt className="gift-left-arrow"/> <AiFillGift/> <BiLeftArrowAlt className="gift-right-arrow"/> </button>
                    :  
                    <button>done</button> 
                    }    

                </form>
      
            </div>
            }

            </div>
        </div>
        }       
        </Fragment>
    )
}

const mapStateToProps = state => ({
    home: state.homeReducers,
    order: state.orderReducers,
})

export default connect(mapStateToProps, {createGiftCardSession})(Gift)
