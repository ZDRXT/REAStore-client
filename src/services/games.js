class Games {
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
            if (filters.platform) {
                const hasPlatform = game.platforms.some(
                    (p) => p.id.toLowerCase() === filters.platform.toLowerCase()
                );
                if (!hasPlatform) return false;
            }

            if (filters.hotGames !== undefined) {
                if (game.hot_game !== filters.hotGames) return false;
            }

            if (filters.price) {
                if (
                    (filters.price.from !== undefined &&
                        game.price < filters.price.from) ||
                    (filters.price.to !== undefined && game.price > filters.price.to)
                ) {
                    return false;
                }
            }

            if (filters.genre) {
                if (!game.genre || !game.genre.toLowerCase().includes(filters.genre.toLowerCase())) {
                    return false;
                }
            }

            if (filters.multiplayer !== undefined) {
                if (game.multiplayer !== filters.multiplayer) return false;
            }

            if (filters.language && filters.language.length > 0) {
                const hasLanguage = filters.language.some((lang) =>
                    game.language?.includes(lang)
                );
                if (!hasLanguage) return false;
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