
import './CreateFeed.scss';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {createFeed, deleteFeed} from '../../actions/homeActions';
import { date } from '../../functions/functions';
import { MdDelete } from 'react-icons/md';

export const Home = (props) => {
    const createFeed = props.createFeed;
    const admin = props.admin;
    const feed = props.feed

    const [data, setData] = useState({
        description: ""
    })
    const {description} = data

    const onSubmit = (e) => {
        e.preventDefault()
        createFeed(data)
        setData({
            description: ""
        })
    }

    const onChange = (e) => setData({...data, [e.target.name] : e.target.value})

    return (
        <Fragment>
            {admin === "admin" ? 
            <div className="create-feed-container">
                <form onSubmit={(e) => onSubmit(e) }>
                    <textarea type="text" name="description" placeholder="hello" value={description} onChange={(e) => onChange(e) } />
                    <button>Create Feed</button>
                </form>
            </div>
            : "" }

            <div className="feed-title">
            <h2>Welcome to The Cake Dilemma store. Check here for the latest updates.</h2>
            </div>

            <div className="feed-container">
                {!feed ? <div className="loading" /> :
                <Fragment>
                    {feed.map((el) => 
                    <div className="feed-content" key={el._id}>
                        <li>
                            {admin === "admin" ?  <button onClick={() => deleteFeed(el._id) }><MdDelete/></button> : ""} {date(el.createdAt)} <br/>
                            {el.description}
                        </li>
                    </div>
                    )}
                </Fragment>
                }
            </div>
        </Fragment>
    )
}


export default connect(null, {createFeed, deleteFeed})(Home)


