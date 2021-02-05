import './Gift.scss';
import React, { Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alertActions';

import {createGiftCardSession, checkGiftCardBalance} from '../../actions/orderActions';

import {BsCircle, BsCircleFill} from 'react-icons/bs';
import {AiFillGift} from 'react-icons/ai';
import {BiRightArrowAlt, BiLeftArrowAlt} from 'react-icons/bi';

import {loadStripe} from '@stripe/stripe-js'
//const stripePromise = loadStripe(process.env.NODE_ENV === "production" ? process.env.REACT_APP_STRIPE_PUB_KEY_LIVE : process.env.REACT_APP_STRIPE_PUB_KEY)
const stripePromise = process.env.REACT_APP_STRIPE_PUB_KEY;

const Gift = ({home:{data, loading}, order:{gift_card_session, gift_card_balance}, createGiftCardSession, checkGiftCardBalance}) => {
    const gift_card_amount = data?.gift.split(" ").map(Number);

    const [done, setDone] = useState("")
    const [checkBalance, setCheckBalance] = useState("")

    const [formData, setFormData] = useState({
        balance: 5 || gift_card_amount[0],
        buyer_email: "",
        recipient_email: "",
        message: "",
        name: "",
    })
    const {balance, buyer_email, recipient_email, message, name} = formData;

    const onChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value})
        if(buyer_email.includes("@")){
            setDone(false)
        }
    }

    //check gift card balance
    const onSubmitCheckBalance = (e) => {
        e.preventDefault(e)
        checkGiftCardBalance(checkBalance)
    }

    //create all the information needed for the session which will include the 
    const onSubmit = (e) => {
        e.preventDefault();
        createGiftCardSession(formData)
        setDone("awaiting")
        setTimeout(() => {setDone(true)}, 2000)
    }

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

            <h2>
                Send the gift of cake to your loved ones! <br/> The Cake Dilemma gift cards are all sent virtually 
                - the code is sent either directly to your recipient's email or to your email for you to personally present them. <br/>
                After all, what's a better gift than delicious treats?
            </h2>

            <div className="gift-content">
            {gift_card_amount.map((el, index) => 
                <button key={index+el} className="" onClick={() => setFormData({...formData, balance: el})}>
                {balance === el ? <BsCircleFill className="icon-selected"/>  : <BsCircle className="icon"/> }
                £{el}
                </button>
            )}

            <div className="gift-card-content">
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="balance"><p>£{balance}</p></div>
                    <label>Your Name :  </label>
                    <input type="text" placeholder="..." name="name" value={name} onChange={e => onChange(e)} minLength="2" required /><br/>
                    <label>Your Email :  </label>
                    <input type="email" placeholder="...." name="buyer_email" value={buyer_email} onChange={e => onChange(e)} minLength="5" required /><br/>
                    <label>Send To ( optional ) :  </label>
                    <input type="email" placeholder="...." name="recipient_email" value={recipient_email} onChange={e => onChange(e)}    /><br/>
                    <label>Send A Message ( optional ) :  </label>
                    <textarea type="text" placeholder="..." name="message" value={message} onChange={e => onChange(e)} maxLength="1000"    /><br/>
                    <br/>
                
                        {done === "awaiting" ?
                        <div className="loading_3" />
                        :
                        done
                        ?
                        <button type="button" className="buy-gift-card-btn" role="link" onClick={handleClick}><BiRightArrowAlt className="gift-left-arrow"/> <AiFillGift/> <BiLeftArrowAlt className="gift-right-arrow"/> </button>
                        :  
                        <button className="wrap-gift-card-btn">Wrap Gift</button> 
                        }   
                </form>
            </div>


            <div className="gift-card-balance">
                <h1>Check Gift Card Balance</h1>
                <form onSubmit={(e) => onSubmitCheckBalance(e)}>
                    <input type="text" placeholder="Enter your 16 digit code" onChange={(e) => setCheckBalance(e.target.value)} minLength="16" required />
                    <br/><br/>
                    <h2>{!gift_card_balance ? "" : `Remaning balance : £${gift_card_balance}`}</h2>
                    <br/>
                    {checkBalance.length !== 16 ? "" : <button>Check</button> }
                </form>
            </div>

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

export default connect(mapStateToProps, {createGiftCardSession, checkGiftCardBalance})(Gift)
