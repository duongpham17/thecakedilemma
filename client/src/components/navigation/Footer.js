import './Footer.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {IoIosArrowUp} from 'react-icons/io';
import {FiMail} from 'react-icons/fi';
import {AiOutlineWhatsApp, AiOutlineInstagram, AiOutlineFacebook} from 'react-icons/ai';

const Footer = () => {

    const arrowUp = () => {
        window.scroll({top: 0, behavior: "smooth"})
    }

    return (
        <footer>
        <div className="top-content">
            <button onClick={() => arrowUp()}><IoIosArrowUp/></button>
            <p>&copy; 2021, The Cake Dilemma</p>
        </div>

        <div className="contact-content">
            <p>Get in touch 
                <a href="mailto:thecakedilemma@gmail.com"><FiMail className="icon"/></a>
                <a href="#/"><AiOutlineWhatsApp className="icon"/></a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/thecakedilemma/"><AiOutlineInstagram className="icon"/></a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/thecakedilemma/"><AiOutlineFacebook className="icon"/></a>
            </p>
        </div>

        <div className="link-content">
            <p onClick={() => arrowUp()}><Link to="/about">About</Link></p>
            <p onClick={() => arrowUp()}><Link to="/privacy">Privacy & Cookies</Link></p>
        </div>

        </footer>
    )
}

export default Footer


/*
            <div className="top-content">
            <button onClick={() => arrowUp()}><IoIosArrowUp/></button><br/>
            </div>
            <li>&copy; 2021, The Cake Dilemma</li>
            <br/>
            <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/thecakedilemma/">Follow us on Instagram</a></li>
            <br/>
            <li onClick={() => arrowUp()}><Link to="/about">About</Link></li>
            <li onClick={() => arrowUp()}><Link to="/privacy">Privacy & Cookies</Link></li>
            <li><a href="mailto:thecakedilemma@gmail.com">Contact</a></li>

*/