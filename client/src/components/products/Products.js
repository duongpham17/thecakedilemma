import './Products.scss';
import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, bestSeller } from '../../actions/productActions';
import Sort from './Sort';
import {FaStar} from 'react-icons/fa';

export const Product = ({ auth:{user}, product:{products, loading}, getProducts, bestSeller, location}) => {

    //get the type via pathname in the url. Product associated with pathname === type E.g postal, cake ...
    const [sort, setSort] = useState(!localStorage.getItem('sort') ? "-createdAt" : localStorage.getItem('sort'))

    useEffect(() => {
        getProducts(sort, 100, location.pathname.slice(10, 1000))
    }, [getProducts, sort, location])

    return (
        <div className="products-container">
            <Sort setSort={setSort} sort={sort} />
            
            {!products ? 
            <Fragment>
                {loading ? <div className="loading"/> : "" }
            </Fragment>
            : 
            <div className="template-container">
            {products.map((el) => 
                <div key={el._id} className="card">
                    {!user ? "" : user.role === "admin" ? <button className="star" onClick={() => bestSeller(el._id, el.best === "best" ? "none" : "best")}>{el.best === "best" ? <FaStar color="gold"/> : <FaStar/>}</button> : "" }
                    <button><Link to={`/product/${el.title}`}><img src={el.image.length === 0 ? "" : el.image[0].url} alt=""/></Link></button>
                    {el.quantity <= 1 ? <p className="out-of-stock">Out of Stock</p> : "" }
                    <h2>{el.title}</h2>
                    <p>{el.price}</p>
                </div>
            )}
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.productReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getProducts, bestSeller})(Product)
