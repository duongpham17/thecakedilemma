import './Basket.scss';
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {saveDataToLocalStorage} from '../../functions/functions';
import {loadBasket} from '../../actions/orderActions';
import {updateQuantity} from '../../actions/productActions';

const Basket = props => {
    const basket = props.basket;
    const loggedOn = props.loggedOn;
    const total = props.total;
    const loadBasket = props.loadBasket;
    const updateQuantity = props.updateQuantity;

    const slice = !basket ? "" : basket.length <= 5 ? "" : basket.slice(5, 100).map(el => el.total).reduce((a, c) => a + c)

    const removeFromBasket = (e, id, quantity, unqiue) => {
        e.preventDefault()
        saveDataToLocalStorage(unqiue)
        updateQuantity(id, quantity, "add")
        loadBasket(JSON.parse(localStorage.getItem("basket")))
        if(!localStorage.getItem('basket-expires')) return localStorage.setItem('basket-expires', Date.now() + (2 * 3600000))
    }

    return (
        <div className={`basket-nested-container ${!basket || basket.length === 0 ? "no-border" : ""}`}>
            {!basket ? "" : basket.slice(0, 5).map((el) => 
                <div className="basket-content" key={el.unique}>
                    <li className="area-title">{el.title.length > 15 ? `${el.title.slice(0, 15)}...` : el.title}</li> <li className="area-total">£{el.total}</li>
                    {el.size.length >= 1 || el.flavour.length >= 1 ? <li className="area-options">{el.size} {el.flavour}</li> : ""}
                    <li className="area-quantity">Qty {el.quantity}</li>
                    <button className="area-trash" onClick={(e) => removeFromBasket(e, el.id, el.quantity, el.unique)}><RiDeleteBin6Line className="icon_"/></button>
                </div>
            )}
            
            {!basket || basket.length === 0  ? "" : 
            <div className="total-content">
                {basket.length > 5 ? 
                <Fragment>
                    <li className="area-more">{basket.length - 5} More item</li>
                    <li className="area-more-total">£{slice}</li>
                </Fragment>
                : ""}
                <li className="area-total">Total</li> <li className="area-basketTotal">£{total}</li>
                <li className={`area-view ${total >= 10 ? "" : "no-border"}`}><Link to="/basket">View</Link></li>
                {total >= 10 ? <li className="area-checkout"><Link to={loggedOn ? "/checkout" : "/basket/guest"}>Checkout</Link></li> : "" }
            </div>
            }
        </div>
    )
}

export default connect(null, {loadBasket, updateQuantity})(Basket)
