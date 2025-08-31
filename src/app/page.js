import HomePage from "@/allPages/home-page/HomePage";
import gameService from "@/services/games";

export default async function Home() {
  const games = await gameService.getAllGames()
  
  return (
    <HomePage games={games}/>
  );
}
