import './CreateProduct.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createProduct} from '../../../actions/adminActions';

const Create = ({createProduct, auth:{user} }) => {

    const [formData, setFormData] = useState({
        user: user._id,
        title: "",
        price: "", 
        quantity: "",
        description: "",
        type: "",
        size: "",
        flavour: "",
        optPrice: "",
        ingredient: "",
        sortPrice: 1,
    })
    const {title, price, quantity, description, type, ingredient, size, flavour, optPrice, sortPrice} = formData

    const onSubmit = (e) => {
        e.preventDefault()
        createProduct(formData)
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    return (
        <div className="create-product-container">
            <form onSubmit={e => onSubmit(e)}>
                <p>Title</p>
                <input type="text" placeholder="....." name="title" value={title} onChange={e => onChange(e)} required  />

                <p>Type</p>
                <button type="button" className={type === "postal" ? "type" : ""} onClick={() => setFormData({...formData, type: type === "postal" ? "" : "postal"})}>Postal</button>
                <button type="button" className={type === "cake" ? "type" : ""} onClick={() => setFormData({...formData, type: type === "cake" ? "" : "cake"})}>Cake</button>

                <p>Size ( no commas ) </p>
                <textarea type="text" placeholder="E.g small medium large... Value? 1inches 2inches or 1-inch 2-inches... " name="size" value={size} onChange={e => onChange(e)}   />

                <p>Flavour ( no commas ) </p>
                <textarea type="text" placeholder="E.g vanilla vanilla ... Linked words E.g vanilla-cake pandan-cake..." name="flavour" value={flavour} onChange={e => onChange(e)}  />

                <p>Price ( no commas ) </p>
                <textarea type="text" placeholder="E.g 5 10 15" name="optPrice" value={optPrice} onChange={e => onChange(e)}  />

                <p>Display Price</p>
                <input type="text" placeholder="....." name="price" value={price} onChange={e => onChange(e)} required   />

                <p>Sort Price</p>
                <input type="text" placeholder="....." name="sortPrice" value={sortPrice} onChange={e => onChange(e)}  />

                <p>Quantity</p>
                <input type="number" placeholder="....." name="quantity" value={quantity} onChange={e => onChange(e)} required />

                <p>Description</p>
                <textarea type="text" placeholder="....." name="description" value={description} onChange={e => onChange(e)} required />

                <p>Ingredient</p>
                <textarea type="text" placeholder="....." name="ingredient" value={ingredient} onChange={e => onChange(e)} required />

                <br/>
                <button className="main-btn">Create</button>
            </form>
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.authReducers
})
export default connect(mapStateToProps, {createProduct})(Create)
