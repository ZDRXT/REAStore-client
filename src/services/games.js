import { siteURL } from "@/constants/config"

class Games {
    constructor() {
        this.url = siteURL + "/data/games/products.json"
    }

    async getAllGames() {
        try {
            const res = await fetch(this.url)
            const data = await res.json()

            return data
        } catch (error) {
            throw error
        }
    }

    getGamesByPlatform(allGames, platform) {
        try {
            const gamesByPlatform = allGames.filter(game => game.platforms.some(element => element.id === platform))

            if (!gamesByPlatform || gamesByPlatform.length === 0) {
                throw new Error("Game is not defined..")
            }

            return gamesByPlatform
        } catch (error) {
            throw error
        }
    }

    getGamesByFilter(allGames, filters) {
        return allGames.filter((game) => {
            if (filters.platforms) {
                const selectedPlatforms = filters.platforms.toLowerCase().split(",");
                const gamePlatforms = game.platforms.map(p => p.id.toLowerCase());

                const hasAnyPlatform = selectedPlatforms.some(platform =>
                    gamePlatforms.includes(platform)
                );

                if (!hasAnyPlatform) return false;
            }

            if ((filters.minPrice !== undefined && game.price < filters.minPrice) || (filters.maxPrice !== undefined && game.price > filters.maxPrice)) {
                return false;
            }

            if (filters.genres) {
                const selectedGenres = filters.genres.split(",");
                if (!game.genre || !selectedGenres.some(g => game.genre.includes(g))) {
                    return false;
                }
            }

            if (filters.languages) {
                const selectedLanguages = filters.languages.split(",").map(lang => lang === "Ukrainian" ? "Українська" : lang)
                if (!game.language || !selectedLanguages.some(g => game.language.includes(g))) {
                    return false;
                }
            }

            if (filters.other) {
                let result = false

                if (filters.other.includes("available[true]")) result = result || game.available
                if (filters.other.includes("available[false]")) result = result || !game.available
                if (filters.other.includes("multiplayer[true]")) result = result || game.multiplayer
                if (filters.other.includes("multiplayer[false]")) result = result || !game.multiplayer
                if (filters.other.includes("hot_game")) result = result || game.hot_game

                return result
            }

            return true;
        });
    }

    getRandomGames(allGames, count) {
        let randomGames = []

        while (randomGames.length < count) {
            let game = allGames[Math.floor(Math.random() * allGames.length)]

            if (randomGames.find(element => element.id === game.id)) continue

            randomGames.push(game)
        }

        return randomGames
    }
}

const gameService = new Games()

export default gameService