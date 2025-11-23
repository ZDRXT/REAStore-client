import "./BasketPage.scss"

import FilteredGames from "../home-page/filtered-games/FilteredGames"

import BasketList from "./basket-list/BasketList"

const BasketPage = ({ games }) => {
    return (
        <main>
            <BasketList />
            
            <FilteredGames games={games} filter={{ hotGames: true }} title={"Також може зацікавити: "} />
        </main>
    )
}

export default BasketPage