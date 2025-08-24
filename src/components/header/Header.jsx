"use client"

import { ShoppingBasket, AlignJustify, X } from "lucide-react"
import { useState } from "react"

import "./Header.scss"
import Link from "next/link"
import Logo from "../logo/Logo"
import Menu from "../menu/Menu"

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false)

    const toggleMenu = () => {
        setActiveMenu(prev => !prev)
    }

    return (
        <header>
            <div className="container">
                <div className="header-wrapper">
                    <div className="header-logo"><Logo /></div>

                    <div className={`header-menu ${activeMenu ? "active" : ""}`}><Menu /></div>

                    <div className="header-basket"><Link href="/basket"><ShoppingBasket /><figure>5</figure></Link></div>

                    <button className="header-burger btn" onClick={toggleMenu}>
                        {activeMenu ? <X /> : <AlignJustify />}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header