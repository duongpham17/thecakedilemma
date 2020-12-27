import './Products.scss';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../actions/productActions';
import Sort from './Sort';

export const Product = ({product:{products, loading}, getProducts, location}) => {

    //get the type via pathname in the url. Product associated with pathname === type E.g postal, cake ...
    const type = location.pathname.slice(10, 1000);
    const limit = 100;
    const [sort, setSort] = useState(!localStorage.getItem('sort') ? "-createdAt" : localStorage.getItem('sort'))

    useEffect(() => {
        getProducts(sort, limit, type)
    }, [getProducts, sort, limit, type])

    return (
        <div className="products-container">
            <Sort setSort={setSort} sort={sort} />
            
            {!products ? 
            <div className="loading"/>
            : 
            <div className="template-container">
            {products.map((el, index) => 
                <div key={index} className="card">
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
    product: state.productReducers
})

export default connect(mapStateToProps, {getProducts})(Product)
