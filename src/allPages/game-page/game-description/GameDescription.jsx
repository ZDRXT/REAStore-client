"use client"

import "./GameDescription.scss"

import { Info } from "lucide-react"

const GameDescription = ({ game }) => {
    return (
        <section className="GameDescription" id="GameDescription">
            <div className="container">
                <div className="GameDescription-wrapper">
                    <h2><Info size={24}/><span>Опис</span></h2>

                    <div className="divider"></div>

                    <p>{game.description}</p>
                </div>
            </div>
        </section>
    )
}

export default GameDescription