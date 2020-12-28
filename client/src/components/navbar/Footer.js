import React from 'react';
import {ImArrowUp} from 'react-icons/im';
import {Link} from 'react-router-dom';

const Footer = () => {

    const arrowUp = () => {
        window.scroll({top: 0, behavior: "smooth"})
    }

    return (
        <footer>
            <button onClick={() => arrowUp()}><ImArrowUp size="1.5rem"/></button><br/>
            <li>&copy; 2021, The Cake Dilemma</li>
            <br/>
            <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/thecakedilemma/">Follow us on Instagram</a></li>
            <br/>
            <li onClick={() => arrowUp()}><Link to="/about">About</Link></li>
            <li onClick={() => arrowUp()}><Link to="/privacy">Privacy & Cookie</Link></li>
            <li><a href="mailto:thecakedilemma@gmail.com">Contact</a></li>
        </footer>
    )
}


export default Footer
