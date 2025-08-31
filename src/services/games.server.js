import fs from 'fs'
import path from 'path'

class ServerGames {
    constructor() {
        this.url = 'public/data/games/products.json'
    }

    getAllGames() {
        try {
            const filePath = path.join(process.cwd(), this.url)
            const fileContents = fs.readFileSync(filePath, 'utf8')
            return JSON.parse(fileContents)
        } catch (error) {
            console.error('Error reading games file:', error)
            throw error
        }
    }

    getGame(link) {
        try {
            const allGames = this.getAllGames()

            const game = allGames.find(element => element.link === link)

            if (!game) throw new Error("Game is not defined..")

            return game
        } catch (error) {
            throw error
        }
    }
}

const serverGameService = new ServerGames()

export default serverGameService