import { siteURL } from "@/constants/config"

class ServerGames {
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

    async getGame(link) {
        try {
            const allGames = await this.getAllGames()

            const game = allGames.find(element => element.link === link)

            if (!game) throw new Error("Game is not defined..")

            return game
        } catch (error) {
            throw error
        }
    }

    async getAvailabeFilters() {
        try {
            const allGames = await this.getAllGames()

            const prices = this.getAvailabePrices(allGames)
            const genres = this.getAvailabeGenres(allGames)
            const platforms = this.getAvailabePlatforms(allGames)
            const languages = this.getAvailableLanguages(allGames)
            const other = this.getOtherFilters(allGames)

            return { prices, genres, platforms, languages, other }
        } catch (error) {
            throw error
        }
    }

    getAvailabeGenres(allGames) {
        try {
            return Object.entries(allGames.flatMap(game => game.genre).reduce((acc, genre) => {
                acc[genre] = (acc[genre] || 0) + 1
                return acc
            }, {})).map(([genre, counts]) => ({ genre, counts }))
        } catch (error) {
            throw error
        }
    }

    getAvailabePrices(allGames) {
        try {
            const allPrices = allGames.map(game => game.price)

            return [Math.min(...allPrices), Math.max(...allPrices)]
        } catch (error) {
            throw error
        }
    }

    getAvailabePlatforms(allGames) {
        try {
            return Object.values(allGames.flatMap(game => game.platforms)
                .reduce((acc, platform) => {
                    if (!acc[platform.id]) {
                        acc[platform.id] = { ...platform, count: 0 }
                    }
                    acc[platform.id].count++
                    return acc
                }, {}))
        } catch (error) {
            throw error
        }
    }

    getAvailableLanguages(allGames) {
        try {
            return Object.entries(allGames.flatMap(game => game.language).reduce((acc, language) => {
                acc[language] = (acc[language] || 0) + 1
                return acc
            }, {})).map(([language, counts]) => ({ language, counts }))
        } catch (error) {
            throw error
        }
    }

    getOtherFilters(allGames) {
        try {
            const avTrueLength = allGames.filter(game => game.available).length
            const avFalseLength = allGames.filter(game => !game.available).length

            const multTrueLength = allGames.filter(game => game.multiplayer).length
            const multFalseLength = allGames.filter(game => !game.multiplayer).length

            const hotTrueLength = allGames.filter(game => game.hot_game).length

            return [
                {
                    id: "available[true]", label: "В наявності", status: true, count: avTrueLength
                },
                {
                    id: "available[false]", label: "Немає в наявності", status: false, count: avFalseLength
                },
                {
                    id: "multiplayer[true]", label: "Мультиплеєр", status: true, count: multTrueLength
                },
                {
                    id: "multiplayer[false]", label: "Соло", status: false, count: multFalseLength
                },
                {
                    id: "hot_game", label: "Популярні", status: true, count: hotTrueLength
                }
            ]
        } catch (error) {
            throw error
        }
    }
}

const serverGameService = new ServerGames()

export default serverGameService