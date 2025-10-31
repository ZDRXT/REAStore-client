'use client'

import "./GameNavigation.scss"

import { Dices, BadgeInfo, List, MessageSquareMore } from "lucide-react"
import { scrollTo } from "@/utils/utils"

const GameNavigation = () => {
    return (
        <nav className="GameNavigation">
            <div className="container">
                <ul className="GameNavigation-list">
                    <li className="GameNavigation-list__item">
                        <a onClick={() => scrollTo({top: 0})}><Dices /><span>Все про гру</span></a>
                    </li>

                    <li className="GameNavigation-list__item">
                        <a href="#GameDescription"><BadgeInfo /><span>Опис</span></a>
                    </li>

                    <li className="GameNavigation-list__item">
                        <a href="#GameCharacteristics"><List /><span>Характеристики</span></a>
                    </li>

                    <li className="GameNavigation-list__item">
                        <a href="#GameReviews"><MessageSquareMore /><span>Відгуки</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default GameNavigation