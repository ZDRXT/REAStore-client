"use client"

import "./AllGamesContent.scss"

import ProductCard from "@/components/product-card/ProductCard"

import { useState, useEffect } from "react"

import { ListFilterPlus } from "lucide-react"

import { getCatalogTitle } from "@/utils/utils"

import NotFound from "@/components/not-found/NotFound"

const AllGamesContent = ({ filteredGames, handleOpenFilter, filterParams }) => {
    const [contentTitle, setContentTitle] = useState("Переглянути ігри:")

    useEffect(() => {
        setContentTitle(getCatalogTitle("Переглянути ігри за: ", filterParams))
    }, [filterParams])


    return (
        <section className="allGames-content">
            <div className="allGames-content__top">
                <h1>{contentTitle}</h1>
                <button className="allGames-content__filterbtn" onClick={handleOpenFilter}><ListFilterPlus /> Фільтр</button>
            </div>

            {
                filteredGames && filteredGames.length > 0 ?
                    <div className="allGames-content__list">
                        {filteredGames.map(game => <ProductCard product={game} key={game.id} />)}
                    </div> :
                    < NotFound text={"Схоже таких ігор немає..."} link={"/all-games"} linkText={"До всіх ігор"} />
            }
        </section>
    )
}

export default AllGamesContent