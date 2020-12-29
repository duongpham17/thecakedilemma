import './Review.scss';
import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {FaStar} from 'react-icons/fa';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';

import {createReview, getReviews, deleteReview} from '../../actions/productActions';
import {date} from '../../functions/functions';

export const Review = (props) => {
    const product = props.product;
    const review = props.review;
    const reviewed = props.reviewed;
    const reviewLength = props.reviewLength;
    const loggedOn = props.auth.loggedOn;
    const user = !props.auth.user ? "guest" : props.auth.user._id;
    const role = !props.auth.user ? "guest" : props.auth.user.role;
    const getReviews = props.getReviews;
    const createReview = props.createReview;
    const deleteReview = props.deleteReview;

    const [write, setWrite] = useState(false)
    const [hoverStar, setHoverStar] = useState(0)

    const limit = 10
    const [page, setPage] = useState(1)

    const [data, setData] = useState({
        name: "",
        description: "",
        rating: "",
        product: product._id,
    })

    useEffect(() => {
        getReviews(product._id, user, page, limit)
    }, [getReviews, product, page, limit, user])

    const onSubmit = (e) => {
        e.preventDefault()
        createReview(data)
        setWrite(false)
    }

    return (
        <div className="review-container">
            <h2>Reviews: {product.ratingsQuantity} <br/>{[...Array(Math.round(product.ratingsAverage))].map((e, i) => <FaStar key={i} className="icon"/>)}</h2>

            {loggedOn ? 
            <Fragment>
                <div className="write-review-btn">
                    {reviewed ? "Already reviewed" : <button onClick={() => setWrite(!write)}>{write ? "Writing a review" : "Write a review"}</button> }
                </div>

                {write ? 
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="rating-stars">
                        {[...Array(5)].map((el, index) => {
                            const ratingValue = index + 1
                            return (
                                <label key={index}>
                                    <input type="radio" name="rating" value={ratingValue} onClick={(e) => setData({...data, rating: e.target.value})} required/>
                                    <div onMouseEnter={() => setHoverStar(ratingValue)} 
                                        onMouseLeave={() => setHoverStar(null)} 
                                        className={ratingValue <= (hoverStar || data.rating) ? "star-gold" : "star-black"}><FaStar/>
                                    </div>
                                </label>
                                )
                            }
                        )}
                    </div>

                    <input maxLength="25" type="text" placeholder="Your name" onChange={e => setData({...data, name: e.target.value})} required /> <br/>
                    <textarea maxLength="500" type="text" placeholder="Write a review" onChange={e => setData({...data, description: e.target.value})} required />
                    <br/>
                    <button>done</button>
                </form>
                : "" }
            </Fragment>
            : "" }

            {!review ? <div className="loading" /> :
            <div className="mapping-reviews-container">
                {review.map((el) => 
                    <div key={el._id} className="reviews">
                        {role === "admin" ? <li className="bin-review-btn"><button onClick={() => deleteReview(el._id)}>&#x292C;</button></li> : ""}
                        <li>{date(el.createdAt)} {[...Array(el.rating)].map((e, i) => <FaStar key={i} className="icon"/>)}</li>
                        <li><span>{el.name}</span></li>
                        <li>{el.description}</li>
                    </div>
                )}       
            </div>
            }

            {reviewLength > 10 ? 
            <div className="pagination"> 
                <li><button onClick={() => setPage(page === 1 ? 1 : page - 1)}><RiArrowLeftSLine className="arrow-icon"/></button></li>
                <li><h2>{page}</h2></li>
                <li><button onClick={() => setPage(page * limit > reviewLength ? page : page + 1)}><RiArrowRightSLine className="arrow-icon"/></button>    </li>
            </div>
            : ""}

        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authReducers,
})

export default connect(mapStateToProps, {createReview, getReviews, deleteReview})(Review)

