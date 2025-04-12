import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className='privacy-policy'>
            <div className='privacy-policy-header'>
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. Please read our policy carefully to understand how we collect, use, and protect your information.</p>
            </div>
            <div className='privacy-policy-content'>
                <div className='privacy-policy-section'>
                    <h2>1. Information Collection</h2>
                    <p>We collect personal information when you interact with our website, such as when you sign up, purchase services, or communicate with us. This includes:</p>
                    <ul>
                        <li>Personal identification information (Name, email address, phone number, etc.)</li>
                        <li>Browsing data (IP address, browser type, visit duration, etc.)</li>
                        <li>Any information you voluntarily provide to us</li>
                    </ul>
                </div>

                <div className='privacy-policy-section'>
                    <h2>2. How We Use Your Information</h2>
                    <p>Your information helps us provide and improve our services. We use your data for purposes such as:</p>
                    <ul>
                        <li>Processing transactions and delivering services</li>
                        <li>Improving website functionality and user experience</li>
                        <li>Communicating with you about offers, updates, and customer service</li>
                    </ul>
                </div>

                <div className='privacy-policy-section'>
                    <h2>3. Information Sharing</h2>
                    <p>We do not sell or rent your personal information to third parties. However, we may share data with:</p>
                    <ul>
                        <li>Trusted service providers who assist in our business operations</li>
                        <li>Law enforcement agencies as required by law</li>
                    </ul>
                </div>

                <div className='privacy-policy-section'>
                    <h2>4. Security of Your Information</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information.</p>
                    <ul>
                        <li>Encryption of sensitive information</li>
                        <li>Regular security audits</li>
                        <li>Access control to authorized personnel only</li>
                    </ul>
                </div>

                <div className='privacy-policy-section'>
                    <h2>5. Your Consent</h2>
                    <p>By using our website, you consent to our privacy policy.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
