import './BestProducts.scss';
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const BestProducts = props => {
    const best = props.best;

    return (
        <Fragment>
        {!best ? "" : 
        <div className="best-products-container">
            <div className="best-seller-title">
                <p>Best Sellers</p>
            </div>
            <div className="best-products-content">
                {best.map((el) =>
                <div key={el._id} className="card">
                    <button><Link to={`/product/${el.title}`}><img src={el.image.length === 0 ? "" : el.image[0].url} alt=""/></Link></button>
                    {el.quantity <= 1 ? <p className="out-of-stock">Out of Stock</p> : "" }
                    <h2>{el.title}</h2>
                    <p>{el.price}</p>
                </div>
                )}
            </div>
        </div>
        }
        </Fragment>
    )
}


export default BestProducts
