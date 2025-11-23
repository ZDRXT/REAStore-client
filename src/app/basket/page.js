import BasketPage from "@/allPages/basket-page/BasketPage";

import serverGameService from "@/services/games.server";
import BreadCrumbs from "@/components/bread-crumbles/BreadCrumbs";

export default async function Home() {
  const games = await serverGameService.getAllGames()
  
  return <>
    <BreadCrumbs lastLabel="Корзина"/>
    <BasketPage games={games}/>
  </>
}
