"use client"

import "./ProductCard.scss"

import { Flame, MessageSquareMore, ShoppingCart, Check } from "lucide-react"
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
    const { name, available, reviews, price, prev_image, hot_game, discount } = product

    return (
        <div className="ProductCard">
            <div className="ProductCard-image">
                <img src={prev_image} alt="game-icon" />
                <div className="labels">
                    {hot_game ?
                        <figure className="flame"><Flame size={26} /></figure>
                        : ""}
                    {discount ?
                        <figure className="discount">&#9590; {(discount*100).toFixed()} %</figure>
                        : ""}
                </div>
            </div>

            <div className="ProductCard-content">
                <h3 className="title">{name}</h3>
                <div className="in_stock">{available ? <span className="green">В наявності</span> : <span className="red">Не в наявності</span>}</div>
                <div className="reviews"><Rating name="read-only" value={5} readOnly /> <figure><MessageSquareMore /><span>{reviews.length}</span></figure></div>
                <div className="price"><div className="current">{price} ₴</div><div className="full">{(price+price*discount).toFixed()} ₴</div></div>
                <button className="buy-btn"><ShoppingCart size={24}/></button>
            </div>

        </div>
    )
}

{/* <Check /> */}
export default ProductCard