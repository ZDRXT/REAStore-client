import "./Footer.scss"

import Logo from "../logo/Logo"

import Menu from "../menu/Menu"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer-top">
                        <div className="footer-part">
                            <div className="footer__logo">
                                <Logo />
                            </div>
                            <p>Магазин офіціальних ігор: REAStore</p>
                        </div>

                        <div className="footer-part">
                            <div className="footer-nav__title">Навігація сайту</div>

                            <Menu alternative={true} />
                        </div>

                        <div className="footer-part">
                            <div className="footer-nav__title">Години роботи</div>
                            <nav>
                                <ul>
                                    <li><span>Пн - Пт:</span>8:00 - 21:00</li>
                                </ul>
                            </nav>
                        </div>

                        <div className="footer-part">
                            <div className="footer-nav__title">Контакти</div>
                            <nav>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="footer-bottom">

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer