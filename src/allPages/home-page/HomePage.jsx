"use client"

import Hero from "./hero/Hero"
import FilteredGames from "./filtered-games/FilteredGames"

const HomePage = ({ games }) => {
    return (
        <main>
            <Hero games={games} />

            <FilteredGames games={games} filter={{hotGames: true}} title={"Гарячі ігри"}/>
            <FilteredGames games={games} filter={{platform: "steam"}} title={"Steam"}/>
            <FilteredGames games={games} filter={{platform: "playstation"}} title={"PlayStation5"}/>
            <FilteredGames games={games} filter={{platform: "xbox"}} title={"XBox"}/>
        </main>
    )
}

export default HomePage