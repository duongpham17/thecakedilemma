import React from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineMail, AiFillCreditCard} from 'react-icons/ai';
import {BiCookie} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {BsFillHouseFill} from 'react-icons/bs';

const Privacy = props => {
    return (
        <div className="about-container">
            <p>
                <AiOutlineMail className="icon"/>On Signing up you will use a real email account. A code will be sent for you to verify this email is legitmate before creating the account.
                Creating an account means you can track your current purchase and previous purchase, and many other benefits. Passwords are encrypted with (SHA256)
            </p>
            <p>
                <BsFillHouseFill className="icon"/>If you are a signed up user, when checking out you have the option of adding multiple quick addresses. This will help you fill out 
                the name, email and address section for quicker checkout. You can delete these auto fill addresses at any time. For guest the form must be filled out manually. <br/>
                The email you provide at checkout is important, this email will be sent an order receipt with all the information regarding your order. The address you provide must be accurate so orders do not get sent to the wrong address.
                <br/><br/> Your address and email will NOT be used for any sort of marketing, its purpose is to ensure the order you have ordered is correct.
            </p>
            
            <p>
                <BiCookie className="icon"/> This website uses cookies in these ways. <br/> 
                1) Keeping you logged in, this is for better users experience E.g you don't have to enter your login information everytime you refresh or reopen the website.<br/>
                2) Your browser localstorage will be used to keep track of all your basket activities to give you the correct information of what you're going to buy. 
                You can delete your basket data by removing all the items from your basket.
            </p>

            <p>
                <AiFillCreditCard className="icon"/> Payment information is handled by a third party called STRIPE. When checking out a stripe page will appear this will handle the payment information.
            </p>

            <p>
                <MdDelete className="icon"/> You can delete your account at any given time. By going to <Link to="/account">Account</Link>. 
                Order information data will not be deleted when you delete your account. We still need this information for business purposes E.g yearly income and expenses relating to accounting.
            </p>
        </div>
    )
}

export default Privacy
