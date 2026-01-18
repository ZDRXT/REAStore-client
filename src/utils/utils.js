export const isEmptyObj = (object) => {
    return Object.keys(object).length === 0
}

export function roundToHalf(value) {
    return Math.round(value * 2) / 2;
}

export function scrollTo(options) {
    window.scrollTo({ ...options, behavior: "smooth" })
}

export function getCatalogTitle(baseText = "", filters = {}) {
    if (typeof filters !== "object" || typeof baseText !== "string") return "Переглянути ігри:"

    const filtersKeys = Object.keys(filters)

    if (filtersKeys.length === 0) return "Переглянути ігри:"

    const filterLabels = {
        minPrice: "ціною",
        maxPrice: "ціною",
        genres: "жанром",
        platforms: "платформою",
        languages: "мовою",
        other: "іншим"
    }

    const title = baseText + [...new Set(filtersKeys.map(element => filterLabels[element]))].join(", ")

    return title
}

export function generateRandomNumber(max = 10) {
    return (Math.round(Math.random() * max))
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function getSubstring(string = "<202512281100.57445815180@smtp-relay.mailin.fr>") {
    const substring = string.slice(
        string.indexOf(".") + 1,
        string.indexOf("@")
    )
    return substring
}