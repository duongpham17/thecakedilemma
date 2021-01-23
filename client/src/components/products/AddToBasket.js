import './AddToBasket.scss';
import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {updateQuantity} from '../../actions/productActions';
import {loadBasket} from '../../actions/orderActions';
import {BsCircle, BsCircleFill} from 'react-icons/bs';

const AddToBasket = props => {
    const loadBasket = props.loadBasket;
    const product = props.product;
    const updateQuantity = props.updateQuantity;

    const [amount, setAmount] = useState(1);

    const size = !product.size ? "" : product.size.split(" ");
    const flavour = !product.flavour ? "" : product.flavour.split(" ");
    const optPrice = !product.optPrice ? "" : product.optPrice.split(" ");

    const [addBasket, setAddBasket] = useState({
        id: product._id, 
        unique: "",
        title: product.title, 
        description: product.description,
        url: product.image[0].url,
        total: "",
        quantity: amount,
        price: "",
        size: "",
        flavour: "",
        method: product.method,
    })

    const SaveDataToLocalStorage = (data) => {
        //our basket 
        let item = [];
        //add users items from localstorage basket to item.
        item = JSON.parse(localStorage.getItem('basket')) || [];

        //check if any product inside item has the same unique value. This means there is a similar product within the product that needs to be updated.
        if(item.some(el => el.unique === data.unique)){
            //find the index of the unique product within the item array
            const index = item.indexOf(item.find(i => i.unique === data.unique))
            //check the options. In this case the product can have a size and a flavour.
            if(item[index].size === data.size && item[index].flavour === data.flavour){
                //update the quantity
                item[index].quantity = item[index].quantity + amount;
                //update the total
                item[index].total = item[index].total + (amount * data.price);
                //return the update to date basket
                return localStorage.setItem('basket', JSON.stringify(item));
            } else {
                //if item is unqiue but size and flavour does not match, add the product to the first index
                item.unshift(data);
                //return the update to date basket
                return localStorage.setItem('basket', JSON.stringify(item));
            }
        } 
        else {
            //if product is new add the product to the first index
            item.unshift(data);
            //return the update to date basket
            localStorage.setItem('basket', JSON.stringify(item));
        }
    }

    const addToBasket = (e) => {
        e.preventDefault()
        //if amount = 0 do not add to basket
        if(amount === 0) return;
        //first check stock available
        let stock = product.quantity / 2;
        //check if the amount added to basket is greter than available stock, if this is true simply reset the amount to 1
        setAmount(stock < amount ? 1 : amount);
        //update the quantity available
        updateQuantity(product._id, amount, "minus");
        //save the new item to localstorage
        SaveDataToLocalStorage(addBasket);
        //then save the new items added to redux
        loadBasket(JSON.parse(localStorage.getItem("basket")));
        //reset the basket expiry timer
        if(!localStorage.getItem('basket-expires')) return localStorage.setItem('basket-expires', Date.now() + (2 * 3600000));
    }

    const dec_inc = (addsub) => {

        //do not let amount ever go below 0
        if(amount === 0) {
            setAmount(1)
            return setAddBasket({...addBasket, quantity: 1, total: 1 * addBasket.price})
        }
        
        if(addsub === "add") {
            setAmount(amount + 1)
            setAddBasket({...addBasket, quantity: amount + 1, total: ( amount + 1 ) * addBasket.price})
        }
        if(addsub === "sub") {
            setAmount(amount - 1)            
            setAddBasket({...addBasket, quantity: amount - 1, total: ( amount - 1 ) * addBasket.price})
        }
    }

    return (
        <div className="add-to-basket-container">
            <div className="options-content">
                {product.quantity <= 0 ? <li><h2>Out of Stock</h2></li> : 
                <Fragment>
                <li className="price"><h2>{!addBasket.price ? product.price  : `£${Number(addBasket.price).toFixed(2)}`}</h2></li><br/>
                <li><h2>Quantity</h2></li> 
                <li className="boxes"><button onClick={() => dec_inc("sub")}>-</button><button>{amount}</button><button onClick={() => product.quantity === amount ? "" :  dec_inc("add")}>+</button></li> <br/>
                
                {size.length >= 1 && flavour.length >= 1 ? 
                <div className="flavour-n-size">
                    <p className="option-title">Select a size </p>
                    {size.map((el, index) => 
                        <button key={index+el} onClick={() => setAddBasket({...addBasket, size: el, price: optPrice[index], unique: product._id+el+addBasket.flavour, total: optPrice[index] * amount, quantity: amount }) }>{addBasket.size === size[index] ? <BsCircleFill className={`icon ${addBasket.size === size[index] ? "selected" : ""}`}/> : <BsCircle className="icon"/> } {el}</button>
                    )}

                    <p className="option-title">Select a flavour </p>
                    {flavour.map((el, index) => 
                        <button key={index+el} onClick={() => setAddBasket({...addBasket, flavour: el, unique: product._id+addBasket.size+el})}>{addBasket.flavour === flavour[index] ? <BsCircleFill className={`icon ${addBasket.flavour === flavour[index] ? "selected" : ""}`}/> : <BsCircle className="icon"/> }{el}</button>
                    )}

                    <br/>
                    <button className="basket-btn" onClick={(e) => !addBasket.flavour || !addBasket.size ? "" : addToBasket(e) }>Add to basket</button>
                </div>
                : "" }

                {size.length >= 1 && flavour.length <= 0 ? 
                <div className="flavour-n-size">
                    <p className="option-title">Select a size </p>
                    {size.map((el, index) => 
                        <button key={index+el} onClick={() => setAddBasket({...addBasket, size: el, price: optPrice[index], unique: product._id+el, total: optPrice[index] * amount, quantity: amount })}>{addBasket.size === size[index] ? <BsCircleFill className={`icon ${addBasket.size === size[index] ? "selected" : ""}`}/> : <BsCircle className="icon"/> } {el}</button>
                    )}

                    <br/>
                    <button className="basket-btn" onClick={(e) => !addBasket.size ? "" : addToBasket(e) }>Add to basket</button>
                </div>
                : "" }

                {flavour.length >= 1 && size.length <= 0 ? 
                <div className="flavour-n-size">
                    <p className="option-title">Select a flavour </p>
                    {flavour.map((el, index) => 
                        <button key={index+el} onClick={() => setAddBasket({...addBasket, flavour: el, price: optPrice[index], unique: product._id+el, total: optPrice[index] * amount, quantity: amount })}>{addBasket.flavour === flavour[index] ? <BsCircleFill className={`icon ${addBasket.flavour === flavour[index] ? "selected" : ""}`}/> : <BsCircle className="icon"/> } {el}</button>
                    )}

                    <br/>
                    <button className="basket-btn" onClick={(e) => !addBasket.flavour ? "" : addToBasket(e) }>Add to basket</button>
                </div>
                : "" }

                {size.length <= 0 && flavour.length <= 0 ? 
                <div className="flavour-n-size">
                    <button className="basket-btn" 
                    onPointerDown={() => setAddBasket({...addBasket, price: optPrice[0], total: optPrice[0] * amount, quantity: amount, unique: product._id+product.title.slice(0, 4) })} 
                    onMouseEnter={() => setAddBasket({...addBasket, price: optPrice[0], total: optPrice[0] * amount, quantity: amount, unique: product._id+product.title.slice(0, 4) })} 
                    onClick={(e) => addToBasket(e) }>
                    Add to basket
                    </button>
                </div>
                : "" }

                </Fragment>
                }
            </div>
        </div>
    )
}

export default connect(null, {updateQuantity, loadBasket})(AddToBasket)
