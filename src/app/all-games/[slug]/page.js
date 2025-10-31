import serverGameService from "@/services/games.server"
import GamePage from "@/allPages/game-page/GamePage"
import BreadCrumbs from "@/components/bread-crumbles/BreadCrumbs"

export default async function Game({ params }) {
    const { slug } = await params

    const game = await serverGameService.getGame(slug)

    return <>
        <BreadCrumbs lastLabel={game.name} />
        <GamePage game={game} />
    </>
}

