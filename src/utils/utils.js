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