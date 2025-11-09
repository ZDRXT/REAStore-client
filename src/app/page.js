import HomePage from "@/allPages/home-page/HomePage";
import serverGameService from "@/services/games.server";

export default async function Home() {
  const games = await serverGameService.getAllGames()
  
  return (
    <HomePage games={games}/>
  );
}
