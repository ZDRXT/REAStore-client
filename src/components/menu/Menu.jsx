"use client"

import "./Menu.scss"
import Link from "next/link"

const Menu = ({alternative=false}) => {
    return (
        <nav className={`menu ${alternative?"alternative":""}`}>
            <ul>
                <li>
                    <Link href={"/all-games"}>Переглянути все</Link>
                </li>
                <li>
                    <Link href={"/all-games?platform=steam"}>Steam</Link>
                </li>
                <li>
                    <Link href={"/all-games?platform=ps5"}>Ps5</Link>
                </li>
                <li>
                    <Link href={"/all-games?platform=xbox"}>Xbox</Link>
                </li>
                <li>
                    <Link href={"/all-games?hot=true"}>Гарячі пропозиції</Link>
                </li>
                <li>
                    <Link href={"/blog"}>Блог</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu