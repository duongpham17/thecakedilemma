import React from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineMail, AiFillCreditCard} from 'react-icons/ai';
import {BiCookie} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {BsFillHouseFill} from 'react-icons/bs';

const Privacy = () => {
    return (
        <div className="about-container">
            <p>
                <AiOutlineMail className="icon"/>When you sign up for an account with us, you must use a real email account. You will receive a verification code to confirm your email before your account can be created. Having an account will provide many benefits such as order history, saved addresses and faster checkouts. Passwords are encrypted using SHA256.
            </p>
            <br/>
            <p>
                <BsFillHouseFill className="icon"/>If you are a verified user, you have the option of saving multiple addresses to your account which will help you autofill name, email and address for a faster checkout. These addresses can be deleted at any time. 
                If you are checking out as a guest, these must be filled out manually. Please ensure all the information you provide is correct to avoid confusion. Your personal information (such as email and address) will not be used for any form of marketing - it is private information that is used solely to ensure you receive your order and to provide you with the relevant information regarding you order.
            </p>
            <br/>
            <p>
                <BiCookie className="icon"/> This website uses cookies in the following ways:
                Keeping you logged in, this is for a better user experience. E.g your login information can be saved and remain logged in on your device. 
                Browser local storage will be used to keep track of your activity on our website in order to store items in your basket. Basket data will be removed when you empty your basket.
            </p>
            <br/>
            <p>
                <AiFillCreditCard className="icon"/> We use the third party payment system called STRIPE which processes your payment information. The STRIPE page will appear once you are checking out to handle your payment securely.
            </p>
            <br/>
            <p>
                <MdDelete className="icon"/> You can delete your account at any time you wish by going to the <Link to="/account">Account</Link> page. Order information will not be deleted from our system when you delete you account as this is essential data we need for business purposes.
            </p>
        </div>
    )
}

export default Privacy
