import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <section className="footer">
            <section className="footer__top">
            <p className="footer__title">Shop for your fashion needs today</p>
            <div className="footer__button"><Link to="/api/product">Explore Our Collections</Link></div>
            </section>
            <section className="footer__bottom">
            <div className="footer__bottom--left">
                <h3 className="footer__bottom--title">Zeam Fashion Empire</h3>
                <div className="contacts">
                <h2>Contact Us</h2>
                <p>+234-706-642-8889</p>
                <p><a href="mailto:horler.web@gmail.com">zeeam1990@gmail.com</a></p>
                </div>
            </div>
            <div className="footer__bottom--right">
                <div className="footer__bottom--items">
                <h4 className="footer__bottom--head">Features</h4>
                <p>Products</p>
                <p>Services</p>
                <p>Customer Care</p>
                </div>
                <div className="footer__bottom--items">
                <h4 className="footer__bottom--head">Social</h4>
                <p>Facebook</p>
                <p>Whatsapp</p>
                <p>Twitter</p>
                </div>
                <div className="footer__bottom--items">
                <h4 className="footer__bottom--head">Company</h4>
                <p>About</p>
                <p>Our Mission</p>
                <p>Our Vision</p>
                <p>Content</p>
                </div>
                <div className="footer__bottom--items">
                <ul className="social-icons">
                    <li>
                    <a href="https://www.facebook.com">
                        <i className="fab fa-facebook"></i>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.twitter.com/">
                        <i className="fab fa-twitter"></i>
                    </a>
                    </li>
                    <li>
                    <a href="https://codepen.io.com/">
                        <i className="fab fa-codepen"></i>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.linkedin.in">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.instagram.com">
                        <i className="fab fa-instagram"></i>
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            <div className="copy-right">&copy;copyright <a href="https://github.com/horler408">HorlerTech </a>2020. All right reserved</div>
            </section>
        </section>
    )
}
