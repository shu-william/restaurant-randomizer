import React from 'react';
import yelp_logo from "../images/Logo/Light bg/RGB/yelp_logo.png";

const Footer = () => {
    return (
        <div className="footer">
            <p className="footerContent">© 2023 <a className="footerLink" href="https://github.com/shu-william/" target="_blank" rel="noopener noreferrer">William Shu</a></p>
            <p className="footerContent">Powered by <a href="https://yelp.com/" target="_blank" rel="noopener noreferrer"><img id="footerYelpLogo" src={yelp_logo} alt="Yelp logo" /></a> Fusion API</p>
        </div>
    )
}

export default Footer;
