"use client"

import "./GameCharacteristics.scss"

import { List } from "lucide-react"

const GameCharacteristics = ({ game }) => {
    return (
        <section className="GameCharacteristics" id="GameCharacteristics">
            <div className="container">
                <div className="GameCharacteristics-wrapper">
                    <h2><List size={24} /><span>Характеристики</span></h2>

                    <div className="divider"></div>

                    <table>
                        <tbody>
                            {
                                game && game.info ? game.info.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {element.label}
                                            </td>

                                            <td>
                                                {element.value}
                                            </td>
                                        </tr>
                                    )
                                }) : ""
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default GameCharacteristics