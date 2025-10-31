export const isEmptyObj = (object) => {
    return Object.keys(object).length === 0
}

export function roundToHalf(value) {
    return Math.round(value * 2) / 2;
}

export function scrollTo(options) {
    window.scrollTo({...options, behavior: "smooth"})
}