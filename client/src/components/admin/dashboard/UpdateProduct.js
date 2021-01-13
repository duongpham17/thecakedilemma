import './UpdateProduct.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {updateProduct} from '../../../actions/adminActions';

const UpdateProduct = props => {
    const updateProduct = props.updateProduct;
    const data = props.data;

    const [formData, setFormData] = useState({
        title: data.title,
        type: data.type,
        size: data.size,
        flavour: data.flavour,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        minimum: data.minimum,
        ingredient: data.ingredient,
        delivery: data.delivery,
        collect: data.collect,
        deliveryMessage: data.deliveryMessage,
        allergen: data.allergen,
        optPrice: data.optPrice,
        sortPrice: data.sortPrice
    })

    const {title, description, price, quantity, minimum, type, ingredient, delivery, collect, deliveryMessage, allergen, size, flavour, optPrice, sortPrice} = formData

    const onSubmit = e => {
        e.preventDefault()
        updateProduct(data._id, formData)
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="update-container">
            <h2>Product Information</h2>

            <form onSubmit={e => onSubmit(e)}>
                <p>Title</p>
                <input type="text" name="title" defaultValue={title} onChange={e => onChange(e)} required      />

                <p>Type</p>
                <button type="button" className={type === "postal" ? "type" : ""} onClick={() => setFormData({...formData, type: type === "postal" ? "" : "postal"})}>Postal</button>
                <button type="button" className={type === "cake" ? "type" : ""} onClick={() => setFormData({...formData, type: type === "cake" ? "" : "cake"})}>Cake</button>
  
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

                <p>Description</p>
                <textarea type="text"  name="description" defaultValue={description} onChange={e => onChange(e)} required />

                <p>Delivery & Collect</p>
                <button type="button" className={delivery === true ? "type" : ""} onClick={() => setFormData({...formData, delivery: delivery === false ? true : false})}>Delivery</button>
                <button type="button" className={collect === true ? "type" : ""} onClick={() => setFormData({...formData, collect: collect === false ? true : false})}>Collect</button>

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
