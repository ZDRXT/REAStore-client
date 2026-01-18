import { generateRandomNumber, shuffleArray } from "./utils.js"

const letters = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
]

const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

export function generateGameKey() {
    const randomSlugLength = generateRandomNumber(1) + 3

    let key = ""

    for (let i = 0; i < randomSlugLength; i++) {
        key += generateSlug()
        if (i != randomSlugLength - 1) {
            key += "-"
        }
    }

    return key
}

function generateSlug() {
    const symbols = shuffleArray([...letters, ...numbers])
    let slug = ""

    for (let i = 0; i < 5; i++) {
        slug += symbols[generateRandomNumber(symbols.length - 1)]
    }

    return slug
}
