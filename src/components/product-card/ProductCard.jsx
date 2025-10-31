"use client"

import "./ProductCard.scss"

import { Flame, MessageSquareMore, ShoppingCart, Check } from "lucide-react"
import { roundToHalf } from "@/utils/utils";
import Rating from '@mui/material/Rating';
import Link from "next/link";

const ProductCard = ({ product }) => {
    const { name, available, reviews, price, prev_image, hot_game, discount, link } = product

    const averageRating = product ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) / 2 : 0;

    return (
        <div className="ProductCard">
            <Link href={`/all-games/${link}`} className="ProductCard-image">
                <img src={prev_image} alt="game-icon" />
                <div className="labels">
                    {hot_game ?
                        <figure className="flame"><Flame size={26} /></figure>
                        : ""}
                    {discount ?
                        <figure className="discount">&#9590; {(discount * 100).toFixed()} %</figure>
                        : ""}
                </div>
            </Link>

            <div className="ProductCard-content">
                <h3 className="title"><Link href={`/all-games/${link}`} >{name}</Link></h3>
                <div className="in_stock">{available ? <span className="green">В наявності</span> : <span className="red">Немає в наявності</span>}</div>
                <div className="reviews"><Rating name="read-only" max={5} value={roundToHalf(averageRating)} readOnly /> <figure><MessageSquareMore /><span>{reviews.length}</span></figure></div>
                <div className="price"><div className="current">{price} ₴</div><div className="full">{(price + price * discount).toFixed()} ₴</div></div>
                <button className="buy-btn"><ShoppingCart size={24} /></button>
            </div>

        </div>
    )
}

{/* <Check /> */ }
export default ProductCard