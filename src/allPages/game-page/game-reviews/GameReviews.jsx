"use client"

import "./GameReviews.scss"

import { MessageSquareMore, ThumbsUp, ThumbsDown } from "lucide-react"
import { Rating } from "@mui/material"
import { roundToHalf } from "@/utils/utils"

const GameReviews = ({ reviews }) => {
    return (
        <section className="GameReviews" id="GameReviews">
            <div className="container">
                <div className="GameReviews-wrapper">
                    <h2><MessageSquareMore size={24} /><span>Відгуки</span></h2>

                    <div className="divider"></div>

                    <div className="GameReviews-list">
                        {
                            reviews ? reviews.map((element, index) => {
                                return (
                                    <div className="GameReviews-card" key={index}>
                                        <div className="GameReviews-card__top">
                                            <div className="GameReviews-card__top--user">
                                                <div className="GameReviews-card__top--avatar">
                                                    {element.author.substring(0, 1).toUpperCase()}
                                                </div>

                                                <div className="GameReviews-card__top--info">
                                                    <div className="GameReviews-card__top--username">{element.author}</div>
                                                    <div className="GameReviews-card__top--rating"><Rating name="read-only" max={5} value={roundToHalf(element.rating/2)} readOnly /></div>
                                                </div>
                                            </div>

                                            <div className="GameReviews-card__top--date">{element.created_at}</div>
                                        </div>

                                        <div className="GameReviews-card__middle">
                                            <h3>{element.title}</h3>
                                            
                                            <p>{element.text}</p>
                                        </div>

                                        <div className="GameReviews-card__bottom">
                                            <p className={`GameReviews-card__bottom--reaction ${element.recommend ? "GameReviews-card__bottom--like" : "GameReviews-card__bottom--dislike"}`}>{element.recommend ? <ThumbsUp /> : <ThumbsDown />} Автор {element.recommend ? "" : "не"} рекомендує цю гру</p>
                                        </div>
                                    </div>
                                )
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GameReviews

// {
//     "author": "witchy_boi",
//     "rating": 9,
//     "title": "Найкраща гра по Гаррі Поттеру",
//     "text": "Світ дуже детальний, фанати будуть у захваті.",
//     "recommend": true,
//     "created_at": "15.02.2023"
// }