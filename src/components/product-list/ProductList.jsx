"use client"

import "./ProductList.scss"

import { useState, useEffect } from "react"

import { isEmptyObj } from "@/utils/utils"
import ProductCard from "../product-card/ProductCard"
import gameService from "@/services/games"

const ProductList = ({ games, filter = {} }) => {
    const [filteredGames, setFilteredGames] = useState([])

    useEffect(() => {
        if (isEmptyObj(filter)) {
            setFilteredGames(games)

            return
        }

        const result = gameService.getGamesByFilter(games, filter)
        setFilteredGames(result)
    }, [games, filter])

    if (!filteredGames || !Array.isArray(filteredGames) || filteredGames.length === 0) {
        return (
            <div className="productList-error">
                No games
            </div>
        )
    }

    return (
        <div className="productList">
            {filteredGames ? filteredGames.map(game => <ProductCard product={game} key={game.id}/>) : ""}
        </div>
    )
}

export default ProductList