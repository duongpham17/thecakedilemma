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
            <p>&copy; 2021, thecakedilemma.com</p>
        </div>

        <div className="contact-content">
            <p>Get in touch 
                <Link to="/contact" onClick={() => arrowUp()}><FiMail className="icon"/></Link>
                <a target="_blank" rel="noreferrer" href="https://wa.me/+447838328990"><AiOutlineWhatsApp className="icon"/></a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/thecakedilemma/"><AiOutlineInstagram className="icon"/></a>
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/thecakedilemma/"><AiOutlineFacebook className="icon"/></a>
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