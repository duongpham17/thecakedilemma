
import './CreateFeed.scss';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {createFeed} from '../../actions/homeActions';

export const Home = (props) => {
    const createFeed = props.createFeed;
    const admin = props.admin

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
        </Fragment>
    )
}


export default connect(null, {createFeed})(Home)


