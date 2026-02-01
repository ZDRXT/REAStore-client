"use client"

import "./CheckoutPage.scss"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bug, Check } from "lucide-react"

import Link from "next/link"
import useBasketStore from "@/store/useBasketStore"
import gameService from "@/services/games"

import emailService from "@/services/email"

import { generateGameKey } from "@/utils/steam-key-generator.js"
import { getSubstring } from "@/utils/utils"

import Image from "next/image"

const CheckoutPage = () => {
    const { games } = useBasketStore()
    const [gamesData, setGamesData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const [checkoutStatus, setCheckoutStatus] = useState(null)

    const [isSending, setIsSending] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        if (!games || games.length === 0) {
            setTotalPrice(0)
            setGamesData([])
            router.replace("/basket")
            return
        }

        gameService.getAllGames().then(allGames => {
            const gamesData = games.map(item => {
                const exGame = allGames.find(element => element.id === item.id)
                if (exGame) return { ...exGame, counts: item.counts }
            })

            const price = gamesData.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.counts, 0,
            );
            setTotalPrice(price)
            setGamesData(gamesData)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [games])

    const handleSubmitForm = (event) => {
        event.preventDefault()

        setIsSending(true)

        const orderList = gamesData.map((game) => {
            let gameKeys = ""

            for (let i = 0; i < game.counts; i++) {

                gameKeys += generateGameKey()
                if (i < game.counts - 1) {
                    gameKeys += "<br>"
                }
            }

            return `
                <tr>
                    <td style="border:1px solid #000000;">${game.name}</td>
                    <td style="border:1px solid #000000;">${game.counts}</td>
                    <td style="border:1px solid #000000;">${game.price} ₴</td>
                    <td style="border:1px solid #000000;">${game.counts * game.price} ₴</td>
                    <td style="border:1px solid #000000;">${gameKeys}</td>
                </tr>`
        }).join("\n")

        const orderTable = `
            <table width="100%" cellpadding="10" cellspacing="0" border="1" bordercolor="#000000">
                <thead>
                    <tr>
                        <th style="border:1px solid #000000;">Назва гри</th>
                        <th style="border:1px solid #000000;">Кількість</th>
                        <th style="border:1px solid #000000;">Ціна</th>
                        <th style="border:1px solid #000000;">Загальна вартість</th>
                        <th style="border:1px solid #000000;">Ключі</th>
                    </tr>
                </thead>

                <tbody>
                    ${orderList}
                </tbody>
            </table>
        `

        const emailData = {
            params: {
                username: userName,
                order_number: Date.now(),
                game_list: orderTable
            },
            client: {
                "name": userName,
                "email": userEmail
            },
            templateId: 1
        }

        handlePayment().then(data => {
            localStorage.setItem("orderId", data.order_id)
            window.open(data.directUrl)
            checkPayment(data.order_id, emailData).then(data => {
                if (data.status === "success") {
                    setCheckoutStatus({
                        type: "success",
                        message: `ID: ${data.orderId}`
                    })
                }
                if (data.status === "time ended") {
                    setCheckoutStatus({
                        type: "error",
                        message: "Час на оплату вийшов"
                    })
                }
            }).catch((error) => {
                setCheckoutStatus({
                    type: "error",
                    message: `${error.message}`
                })
            }).finally(() => {
                setIsSending(false)
            })
        })
    }

    const handlePayment = async () => {
        try {
            const res = await fetch("/api/liqpay/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: totalPrice, descr: "покупка ігор" })
            })

            if (!res.ok) throw new Error("Помилка сервера")
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const checkPayment = async (orderId, emailData) => {
        let attempts = 0
        const maxAttempts = 10
        console.log("checkpayment", emailData)
        const checkInterval = setInterval(async () => {
            if (attempts >= maxAttempts) {
                clearInterval(checkInterval)
                return {
                    status: "time ended"
                }
            }

            attempts++

            try {
                const res = await fetch("/api/liqpay/check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ orderId, emailData })
                })

                if (!res.ok) throw new Error("Помилка сервера")
                const data = await res.json()
                console.log(1, data)
                if (data.status === "success") {
                    clearInterval(checkInterval)
                }

                return data
            } catch (error) {
                console.log(error.message)
                throw error
            }
        }, 10000)
    }

    return (
        <main>
            {isLoading ?
                <div className="loading">
                    <Image src={"/icons/loader.svg"} alt="loader" width={100} height={100} />
                </div>
                :
                <section className="Checkout">
                    <div className="container">
                        {checkoutStatus && (!checkoutStatus.type === "success" ?
                            <div className="Checkout-success">
                                <Check />
                                <h3>Ваше замовлення відправлено!</h3>
                                <p>ID замовлення: <b>{getSubstring(checkoutStatus.message)}</b></p>
                            </div>
                            :
                            <div className="Checkout-error">
                                <Bug />
                                <h3>Щось пішло не так...</h3>
                                <p>Зверніться у підтримку</p>
                                <p>ID замовлення: <b>{getSubstring(checkoutStatus.message)}</b></p>
                            </div>)
                        }

                        {!checkoutStatus &&
                            <div className="Checkout-box">
                                <h1>Оформлення замовлення</h1>

                                <div className="Checkout-wrapper">
                                    <div className="Checkout-left">
                                        <div className="Checkout-form">
                                            <form onSubmit={handleSubmitForm}>
                                                <div className="Checkout-form__field">
                                                    <label htmlFor="checkout-form-field-name">Name</label>
                                                    <input
                                                        type="text"
                                                        id="checkout-form-field-name"
                                                        placeholder="John"
                                                        required
                                                        minLength={3}
                                                        onChange={(event) => setUserName(event.target.value)}
                                                        value={userName}
                                                    />
                                                </div>

                                                <div className="Checkout-form__field">
                                                    <label htmlFor="checkout-form-field-email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="checkout-form-field-email"
                                                        placeholder="John@123.com"
                                                        required
                                                        onChange={(event) => setUserEmail(event.target.value)}
                                                        value={userEmail}
                                                    />
                                                </div>

                                                <button type="submit" disabled={isSending}>Оформити</button>
                                            </form>
                                        </div>

                                        <div className="Checkout-total">
                                            <h3>Деталі замовлення</h3>

                                            <p><strong>Всього ігор: </strong><span>{gamesData.length}</span></p>
                                            <p><strong>Загальна сума: </strong><span>{totalPrice || 0} ₴</span></p>
                                        </div>
                                    </div>

                                    <div className="Checkout-list">
                                        {gamesData.length > 0 ? gamesData.map(game => {
                                            return (
                                                <div className="Checkout-list__item" key={game.id}>
                                                    <img src={game.prev_image} alt="" />

                                                    <div className="Checkout-list__info">
                                                        <div className="Checkout-list__header">
                                                            <Link href={`/all-games/${game.link}`}><h2>{game.name}</h2></Link>
                                                        </div>

                                                        <div className="Checkout-list__details">
                                                            <div className="Checkout-list__total">
                                                                <div className="Checkout-list__total-label">Всього:</div>
                                                                <div className="Checkout-list__total-price">{game.counts}x {(game.price * game.counts).toFixed(2)} ₴</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : "Кошик пустий"}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            }
        </main>
    )
}

export default CheckoutPage