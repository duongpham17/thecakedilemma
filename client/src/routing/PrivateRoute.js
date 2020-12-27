import React from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, auth: {loggedOn}, ...rest}) => 
(
    <Route {...rest} 
        render={props => loggedOn 
        ? 
        (<Component {...props} />) 
        : 
        <div className="route-not-found">This page is only for logged in users. <Link to='/login'>Please Login</Link> Or <Link to='/signup'>Signup</Link></div> 
        }
    />
);

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps)(PrivateRoute)
