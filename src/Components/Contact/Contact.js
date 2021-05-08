import React from 'react';
import './Contact.css';
import logo from '../../images/Facebook.png';
import logo1 from '../../images/Twitter.png';
import logo2 from '../../images/YouTube.png';

const Contact = () => {
    return (
        <div className="text-center">
            <h4 className="mt-5">BIKE　ＲＩＤＥＲ</h4>
            <footer className="footer mt-5 pt-5">
            <img src={logo} alt=""/>
            <img src={logo1} alt=""/>
            <img src={logo2} alt=""/>
            <p>All rights reserved by Q.R</p>
            </footer>
        </div>
    );
};

export default Contact;