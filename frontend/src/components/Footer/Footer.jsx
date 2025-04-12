import './Footer.css';
import { assets } from '../../assets/assets';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Footer = () => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling to the top
        });
    };

    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <Link to='/'>
                        <img src={assets.logo_white} alt="" className='logo_white' />
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum facilis natus libero asperiores itaque aliquid nesciunt ipsam tenetur magni sit, unde assumenda similique sunt error ab excepturi iure fugiat?</p>
                    <div className="footer-social-icons">
                        <a href="https://www.facebook.com/"><img src={assets.facebook_icon} alt="" /></a>
                        <a href="https://www.x.com/"><img src={assets.twitter_icon} alt="" /></a>
                        <a href="https://www.linkedin.com/"><img src={assets.linkedin_icon} alt="" /></a>
                    </div>
                </div>
                <div className="footer-content-right">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>
                            <Link
                                to='/'
                                onClick={() => {
                                    setMenu("home");
                                    scrollToTop();  // Scroll to top on click
                                }}>
                                Home
                            </Link>
                        </li>
                        <li>  
                            <Link to='/about-us'
                            onClick={()=>{
                                scrollToTop();
                            }}>About Us</Link>
                        </li>

                        <li>  
                            <Link to='/privacy-policy'
                            onClick={()=>{
                                scrollToTop();
                            }}>Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-content-center">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li><a href="tel:">+91 &nbsp; 8663452213</a></li>
                        <li><a href="mailto:">cusine.foods@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">All Rights Reserved At Cusine Foods Copyright 2024&#169;</p>
        </div>
    );
};

export default Footer;
