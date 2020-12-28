import './Home.scss';
import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { getFeed, deleteFeed } from '../../actions/homeActions';
import CreateFeed from './CreateFeed';
import {date} from '../../functions/functions';
import {MdDelete} from 'react-icons/md';

export const Home = ({getFeed, deleteFeed, home:{feed}, auth:{user}}) => {

    useEffect(() => {
        if(!feed){
            getFeed()
        }
    }, [getFeed, feed])

    return (
        <div className="home-container">
            <CreateFeed admin={!user ? "guest" : user.role } />

            Welcome to The Cake Dilemma store. Check here for the latest updates.

            <div className="feed-container">
                {!feed ? <div className="loading" /> :
                <Fragment>
                    {feed.map((el) => 
                    <div className="feed-content" key={el._id}>
                        <li>
                            {!user ? "" : user.role === "admin" ?  <button onClick={() => deleteFeed(el._id) }><MdDelete/></button> : ""} {date(el.createdAt)} <br/>
                            {el.description}
                        </li>
                    </div>
                    )}
                </Fragment>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    home: state.homeReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getFeed, deleteFeed})(Home)


