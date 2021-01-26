import './Basket.scss';
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {saveDataToLocalStorage} from '../../functions/functions';
import {loadBasket} from '../../actions/orderActions';
import {updateQuantity} from '../../actions/productActions';

import {MdClose} from 'react-icons/md'
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'

export const Basket = ({order:{basket, total}, auth:{loggedOn}, updateQuantity, loadBasket}) => {
    
    const removeFromBasket = (e, id, quantity, unqiue) => {
        e.preventDefault()
        saveDataToLocalStorage(unqiue)
        updateQuantity(id, quantity, "add")
        loadBasket(JSON.parse(localStorage.getItem("basket")))
        if(!localStorage.getItem('basket-expires')) return localStorage.setItem('basket-expires', Date.now() + (0.5 * 3600000))
    }
    
    const adjustQuantity = (e, value, total, id, unique, type) => {
        e.preventDefault()
        let item = [];
        item = JSON.parse(localStorage.getItem('basket')) || [];
        const index = item.indexOf(item.find(inx => inx.unique === unique))
        item[index].quantity = value;
        item[index].total = total;
        localStorage.setItem('basket', JSON.stringify(item));
        updateQuantity(id, 1, type)
        loadBasket(JSON.parse(localStorage.getItem("basket")))
    }

    return (
        <div className="checkout-basket-container">
        <h1 className="title">Basket</h1>
        {!basket || basket.length === 0 ?  
        "Empty"
        : 
        <Fragment>
            <table>
                <tbody>
                {basket.map((el) => 
                <tr key={el.unique}>
                    <td className="picture">
                        <Link to={`/product/${el.title}`}> <img src={el.url} alt="checkout"/></Link>
                    </td>
                    <td className="info">
                        <p>{el.title}</p>
                        <p>{el.size} {el.flavour}</p>
                        <p>
                            <span>Qty {el.quantity}</span>
                            <button onClick={(e) => el.quantity === 1 ? "" : adjustQuantity(e, el.quantity - 1, (el.quantity - 1) * el.price, el.id, el.unique, "add"  )}><AiOutlineMinus className="icon"/></button>
                            <button onClick={(e) => el.quantity >= 5 ? "" : adjustQuantity(e, el.quantity + 1, (el.quantity + 1) * el.price, el.id, el.unique, "minus")}><AiOutlinePlus className="icon"/></button>
                        </p>
                    </td>
                    <td className="total">
                        <button onClick={(e) => removeFromBasket(e, el.id, el.quantity, el.unique) }><MdClose className="icon" /></button>
                        <p>£{el.total.toFixed(2)}</p>
                    </td>
                </tr>
                )}
                </tbody>
            </table>

            <div className="checkout-total-content">
                <p>Total £{Number(total).toFixed(2)}</p>
            </div>

            <div className="checkout-link-content">
                {loggedOn ? 
                <p>{total >= 10 ? <Link to='/checkout'>Checkout</Link> : "Minimum order £10"}</p>
                :                 
                <p>{total >= 10 ? <Link to='/basket/guest'>Checkout</Link> : "Minimum order £10"}</p>
                }
            </div>

            </Fragment>
        }
        </div>
    )
}

const mapStateToProps = state => ({
    order : state.orderReducers,
    auth: state.authReducers
})
export default connect(mapStateToProps, {updateQuantity, loadBasket})(Basket)


