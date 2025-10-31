"use client"

import GameNavigation from "./game-navigation/GameNavigation"
import Entry from "./entry/Entry"
import GameDescription from "./game-description/GameDescription"
import GameCharacteristics from "./game-characteristics/GameCharacteristics"
import GameReviews from "./game-reviews/GameReviews"

const GamePage = ({ game }) => {
    return (
        <main>
            <GameNavigation />
            <Entry game={game}/>
            <GameDescription game={game}/>
            <GameCharacteristics game={game}/>
            <GameReviews reviews={game.reviews}/>
        </main>
    )
}

export default GamePage