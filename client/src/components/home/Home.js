import './Home.scss';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getFeed, deleteFeed, getImages, getBestProducts } from '../../actions/homeActions';

import CreateFeed from './CreateFeed';
import UploadImages from './UploadImages';
import BestProducts from './BestProducts';

export const Home = ({getFeed, getImages, getBestProducts, home:{feed, gallery, best}, auth:{user}}) => {

    useEffect(() => {
        if(!feed){
            getFeed()
        }
        if(!gallery){
            getImages()
        }
        if(!best){
            getBestProducts()
        }
    }, [getFeed, feed, getImages, gallery, best, getBestProducts])

    return (
        <div className="home-container">
            <UploadImages admin={!user ? "guest" : user.role } gallery={gallery} />

            <CreateFeed admin={!user ? "guest" : user.role } feed={feed} />

            <BestProducts best={best} />
        </div>
    )
}

const mapStateToProps = state => ({
    home: state.homeReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getFeed, deleteFeed, getImages, getBestProducts })(Home)


