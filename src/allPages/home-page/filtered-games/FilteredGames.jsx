"use client"

import "./FilteredGames.scss"

import ProductList from "@/components/product-list/ProductList"

const FilteredGames = ({ games, filter = {}, title }) => {
    return (
        <section className="filteredGames">
            <div className="container">
                <h2>{title}</h2>

                <ProductList games={games} filter={filter}/>
            </div>
        </section>
    )
}

export default FilteredGames