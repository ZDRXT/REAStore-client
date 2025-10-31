import "./AllGamesContent.scss"

import ProductCard from "@/components/product-card/ProductCard"


const AllGamesContent = ({ filteredGames, handleOpenFilter }) => {


    return (
        <section className="allGames-content">
            <div className="allGames-content__top">
                <h1>Переглянути всі ігри</h1>

                <button className="allGames-content__filterbtn" onClick={handleOpenFilter}>Фільтр</button>
            </div>

            <div className="allGames-content__list">
                {filteredGames ? filteredGames.map(game => <ProductCard product={game} key={game.id} />) : ""}

            </div>
        </section>
    )
}

export default AllGamesContent