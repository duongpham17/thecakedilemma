import './Navbar.scss';
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import {RiAccountBoxLine, RiLogoutBoxRLine} from 'react-icons/ri';
import {BiReceipt} from 'react-icons/bi';
import {GiQueenCrown, GiHamburgerMenu} from 'react-icons/gi';
import {FaShoppingBasket} from 'react-icons/fa';

import Basket from './Basket';

const Navbar = ({logout, auth:{loggedOn, user}, order:{basket, total}, home:{data}}) => {

    const mobileScreen = window.innerWidth <= 650;

    return (
        <nav className="nav-container">
            <div className="img-area">
            <Link to="/"><img src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=1b753feb-407c-4f98-afbe-0da61cce2b4d" alt="" /></Link>
            </div>

            <div className="top-area">
            {loggedOn ? 
            <Fragment>
                {user.role === "admin" ? 
                <div className="admin-container">
                    <li><Link to="/admin">Admin <GiQueenCrown className="icon"/> </Link></li> 
                </div>
                : "" }

                <div className="basket-dp-container">
                    {mobileScreen ? 
                    <li>({!basket ? 0 : basket.length}) <FaShoppingBasket className="icon"/></li>   : 
                    <li><Link to="/basket">({!basket ? 0 : basket.length}) <FaShoppingBasket className="icon"/> </Link></li>
                    }
                    <div className="basket-dp-content">
                        <Basket basket={basket} total={total} loggedOn={loggedOn} minimum={!data ? 10 : data.minimumOrder} />
                    </div>
                </div>
                
                <div className="burger-dp-container">
                    <button className="burger-dp-btn small-screen"><GiHamburgerMenu className="icon"/></button>
                    <div className="burger-dp-content">
                        <li><Link to="/account">Account <RiAccountBoxLine className="icon"/></Link></li>
                        <li><Link to="/order">Orders <BiReceipt className="icon"/></Link></li>
                        <li><Link to='/' className="logout" onClick={() => logout()}>Logout <RiLogoutBoxRLine className="icon"/></Link></li>
                    </div>
                </div>
            </Fragment>
            : 
            <Fragment>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <div className="guest-basket-dp-container">
                    {mobileScreen ? 
                    <li>({!basket ? 0 : basket.length}) <FaShoppingBasket className="icon"/></li> : 
                    <li><Link to="/basket">({!basket ? 0 : basket.length}) <FaShoppingBasket className="icon"/></Link></li> 
                    }
                    <div className="guest-basket-dp-content">
                        <Basket basket={basket} total={total} loggedOn={loggedOn} minimum={!data ? 10 : data.minimumOrder} />
                    </div>
                </div>
            </Fragment>
            }
            </div>

            {!data ? "" :
            <div className="bottom-area">
                <li><Link to="/">Home</Link></li>
                {data.links.split(" ").map((el, index) => <li key={index}><Link to={`/products/${el.toLowerCase()}`}>{el.charAt(0).toUpperCase() + el.slice(1)}</Link></li> )}
                <li><Link to="/faqs">FAQs</Link></li>
            </div>
            }

        </nav>
    )
}

const mapStateToProps = state => ({
    auth : state.authReducers,
    product : state.productReducers,
    order: state.orderReducers,
    home: state.homeReducers,
})

export default connect(mapStateToProps, {logout})(Navbar)