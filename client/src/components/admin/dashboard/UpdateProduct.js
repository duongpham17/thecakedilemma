import './UpdateProduct.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {updateProduct} from '../../../actions/adminActions';

const UpdateProduct = props => {
    const updateProduct = props.updateProduct;
    const edit = props.edit;
    const data = props.data;

    const [formData, setFormData] = useState({
        title: edit.title,
        type: edit.type,
        size: edit.size,
        flavour: edit.flavour,
        description: edit.description,
        price: edit.price,
        quantity: edit.quantity,
        minimum: edit.minimum,
        ingredient: edit.ingredient,
        method: edit.method,
        deliveryMessage: edit.deliveryMessage,
        allergen: edit.allergen,
        optPrice: edit.optPrice,
        sortPrice: edit.sortPrice
    })

    const {title, description, price, quantity, minimum, type, ingredient, method, deliveryMessage, allergen, size, flavour, optPrice, sortPrice} = formData

    const onSubmit = e => {
        e.preventDefault()
        updateProduct(edit._id, formData)
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="update-container">
            <h2>Product Information</h2>

            <form onSubmit={e => onSubmit(e)}>
                <p>Title</p>
                <input type="text" name="title" defaultValue={title} onChange={e => onChange(e)} required      />

                <p>Type</p>
                {!data ? "Loading..." : data.links.split(" ").map((el, index) => 
                <button key={index} type="button" className={type === el.toLowerCase() ? "type" : ""} onClick={() => setFormData({...formData, type: type === el.toLowerCase() ? "" : el.toLowerCase()})}>{el}</button> 
                ) }
  
                <p>Size ( no commas ) </p>
                <textarea type="text" placeholder="E.g small medium large... Value? 1inches 2inches or 1-inch 2-inches... " name="size" value={size} onChange={e => onChange(e)}   />

                <p>Flavour ( no commas ) </p>
                <textarea type="text" placeholder="E.g vanilla vanilla ... Linked words E.g vanilla-cake pandan-cake..." name="flavour" value={flavour} onChange={e => onChange(e)}  />

                <p>Price ( no commas ) </p>
                <textarea type="text" placeholder="E.g 1 2 3" name="optPrice" value={optPrice} onChange={e => onChange(e)} />

                <p>Display Price</p>
                <input type="text" name="price" defaultValue={price} onChange={e => onChange(e)} required    />

                <p>Sort Price</p>
                <input type="text" name="sortPrice" defaultValue={sortPrice} onChange={e => onChange(e)}  />

                <p>Quantity</p>
                <input type="number"   name="quantity" defaultValue={quantity} onChange={e => onChange(e)} required />

                <p>Minimum Order</p>
                <input type="number"   name="minimum" defaultValue={minimum} onChange={e => onChange(e)} required />

                <p>Description *use / to break *</p>
                <textarea type="text"  name="description" defaultValue={description} onChange={e => onChange(e)} required />

                <p>Delivery & Collect</p>
                <button type="button" className="type" onClick={() => setFormData({...formData, method: method === 0 ? 1 : 0 })}>{method === 0 ? "Collect Only" : "Both"}</button>

                <p>Delivery Message</p>
                <textarea type="text"  name="deliveryMessage" defaultValue={deliveryMessage} onChange={e => onChange(e)} required />

                <p>Ingredient</p>
                <textarea type="text"  name="ingredient" defaultValue={ingredient} onChange={e => onChange(e)} required />

                <p>Allergen</p>
                <textarea type="text"  name="allergen" defaultValue={allergen} onChange={e => onChange(e)} required />

                <br/>
                <button className="main-btn">save</button>
            </form>
        </div>
    )
}


export default connect(null, {updateProduct})(UpdateProduct)
