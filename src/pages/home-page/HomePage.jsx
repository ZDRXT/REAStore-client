"use client"

import Hero from "./hero/Hero"
import ProductCard from "@/components/product-card/ProductCard"

const HomePage = ({ games }) => {
    return (
        <main>
            <Hero games={games} />

            <div className="container">
                <div className="all-products">
                    {games ? games.map(game => <ProductCard product={game} />) : ""}
                </div>
            </div>
        </main>
    )
}

export default HomePage