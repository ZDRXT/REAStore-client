import serverGameService from "@/services/games.server";
import gameService from "@/services/games";

import AllGamesPage from "@/allPages/allGames-page/AllGamesPage";

export default async function AllGames({ searchParams }) {
  const allGames = await serverGameService.getAllGames()
  const params = await searchParams
  const filteredGames = gameService.getGamesByFilter(allGames, params)
  const availableFilters = await serverGameService.getAvailabeFilters()

  return (
    < AllGamesPage availableFilters={availableFilters} filteredGames={filteredGames} filterParams={params} />
  );
}
