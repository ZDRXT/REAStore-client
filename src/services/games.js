class Games {
    constructor() {
        this.url = 'http://localhost:3000/data/games/products.json'
    }

    async getAllGames() {
        try {
            const res = await fetch(this.url, {
                next: { revalidate: 600 }
            })

            if (!res) throw new Error("Server error..")

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

    getRandomGames(allGames, count) {
        let randomGames = []

        while (randomGames.length < count) {
            let game = allGames[Math.floor(Math.random()*allGames.length)]

            if (randomGames.find(element => element.id === game.id)) continue

            randomGames.push(game)
        }

        return randomGames
    }
}

const gameService = new Games()

export default gameService