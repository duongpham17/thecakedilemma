import './NotFound.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai'

const NotFound = props => {
    return (
        <section className="route-not-found">
            <Link to='/'>Page cannot be found. Please return to <AiFillHome/> Home page</Link>
        </section>
    )
}
export default NotFound