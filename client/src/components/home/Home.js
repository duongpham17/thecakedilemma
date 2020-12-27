import './Home.scss';
import React from 'react';
import { connect } from 'react-redux';

export const Home = () => {

    return (
        <div className="home-container">
            Welcome to The Cake Dilemma store. Check here for the latest updates.
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(Home)


