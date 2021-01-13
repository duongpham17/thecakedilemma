import './Product.scss';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { getProduct } from '../../actions/productActions';
import ReactHtmlParser from 'react-html-parser';

import AddToBasket from './AddToBasket';
import Image from './Image';
import Review from './Review';

const Product = ({product:{product, review, reviewed, reviewLength}, getProduct, location}) => {
    const title = location.pathname.slice(9, 1000)

    const replace = (str) => str.replace(/\//g, "<br/>")

    useEffect(() => {
        getProduct(title)
    }, [getProduct, title])

    return (
        <div className="product-container">
            {!product ? <div className="loading" /> : 

            <div className="product-content">

                <div className="image-content">
                    <Image data={product.image} />
                </div>

                <div className="information-content">
                    <div className="basket">
                        <h1 className="title">{product.title}</h1>
                        <AddToBasket product={product} />
                    </div>
                    <div className="info">
                        <h2>Description</h2> 
                        <p>{ReactHtmlParser(replace(product.description))}</p>    
                        <h2>Ingredients</h2> 
                        <p>{product.ingredient}</p>
                        <h2>Allergens</h2> 
                        <p>{product.allergen}</p>
                        <h2>{product.method === 0 ? "Collection Only" : "Delivery + Collection"}</h2> 
                        {ReactHtmlParser(replace(product.deliveryMessage))}
                    </div>
                </div>

                <div className="review-content">
                    <Review product={product} review={review} reviewed={reviewed} reviewLength={reviewLength}/>
                </div>
            </div>
            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.productReducers,
})

export default connect(mapStateToProps, {getProduct})(Product)
