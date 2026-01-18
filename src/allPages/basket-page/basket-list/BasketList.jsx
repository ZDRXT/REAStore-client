"use client"

import "./BasketList.scss"

import { useState, useEffect } from "react"

import Link from "next/link"

import gameService from "@/services/games"
import useBasketStore from "@/store/useBasketStore"

import { Trash2 } from "lucide-react"

const BasketList = () => {
    const { games, plusCount, minusCount, removeFromBasket } = useBasketStore()
    const [gamesData, setGamesData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (!games || games.length === 0) {
            setTotalPrice(0)
            setGamesData([])
            return
        }

        gameService.getAllGames().then(allGames => {
            const gamesData = games.map(item => {
                const exGame = allGames.find(element => element.id === item.id)
                if (exGame) return { ...exGame, counts: item.counts }
            })
            console.log(gamesData)
            const price = gamesData.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.counts, 0,
            );
            setTotalPrice(price)
            setGamesData(gamesData)
        })
    }, [games])

    return (
        <section className="BasketList">
            <div className="container">
                <h1>Ваш кошик</h1>
                <div className="BasketList-wrapper">
                    <div className="BasketList-list">
                        {gamesData.length > 0 ? gamesData.map(game => {
                            return (
                                <div className="BasketList-item" key={game.id}>
                                    <img src={game.prev_image} alt="" />

                                    <div className="BasketList-info">
                                        <div className="BasketList-header">
                                            <Link href={`/all-games/${game.link}`}><h2>{game.name}</h2></Link>

                                            <button className="BasketList-deletebtn" onClick={() => removeFromBasket(game.id)}><Trash2 /></button>
                                        </div>

                                        <div className="BasketList-details">
                                            <div className="BasketList__price">{game.price.toFixed(2)} ₴</div>

                                            <div className="BasketList__quantity">
                                                <button onClick={() => minusCount(game.id)}>-</button>
                                                <div className="BasketList__quantity-display">{game.counts}</div>
                                                <button onClick={() => plusCount(game.id)}>+</button>
                                            </div>

                                            <div className="BasketList__total">
                                                <div className="BasketList__total-label">Всього:</div>
                                                <div className="BasketList__total-price">{(game.price * game.counts).toFixed(2)} ₴</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : "Кошик пустий"}
                    </div>

                    <div className="BasketList-summary">
                        <h2>Зведення замовлення</h2>

                        <div className="BasketList-summary-transport">
                            <span>Відправка</span>

                            <span>На пошту</span>
                        </div>

                        <div className="BasketList-summary-products">
                            <span>Всього</span>

                            <span>{totalPrice} ₴</span>
                        </div>

                        <Link className="BasketList-summary__gotoorder" href={"/checkout"}>Перейти до оформлення замовлення</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BasketList