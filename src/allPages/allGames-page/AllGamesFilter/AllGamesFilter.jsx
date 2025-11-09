"use client"

import "./AllGamesFilter.scss"

import { Slider } from "@mui/material"


import { CircleX } from "lucide-react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const AllGamesFilter = ({ availableFilters, handleCloseFilter, isOppennedFilter }) => {
    const [priceRange, setPriceRange] = useState(availableFilters.prices)

    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [languages, setLanguages] = useState([])
    const [others, setOther] = useState([])

    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePriceRange = (event, newPriceRange) => {
        setPriceRange(newPriceRange)
    }

    const handleChangeGenres = (event, genre) => {
        setGenres(prev => {
            if (genres.includes(genre)) {
                return prev.filter(element => element !== genre)
            } else {
                return [...prev, genre]
            }
        })
    }

    const handleChangePlatforms = (event, platform) => {
        setPlatforms(prev => {
            if (platforms.includes(platform)) {
                return prev.filter(element => element !== platform)
            } else {
                return [...prev, platform]
            }
        })
    }

    const handleChangeLanguages = (event, language) => {
        language = language === "Українська" ? "Ukrainian" : language
        setLanguages(prev => {
            if (languages.includes(language)) {
                return prev.filter(element => element !== language)
            } else {
                return [...prev, language]
            }
        })
    }

    const handleChangeOther = (event, other) => {
        setOther(prev => {
            if (others.includes(other)) {
                return prev.filter(element => element !== other)
            } else {
                return [...prev, other]
            }
        })
    }

    const createFilterString = () => {
        const params = new URLSearchParams()

        if (availableFilters.prices[0] !== priceRange[0] || availableFilters.prices[1] !== priceRange[1]) {
            params.set("minPrice", priceRange[0])
            params.set("maxPrice", priceRange[1])
        }

        if (genres.length > 0) {
            params.set("genres", genres.join(","))
        }

        if (platforms.length > 0) {
            params.set("platforms", platforms.join(","))
        }

        if (languages.length > 0) {
            params.set("languages", languages.join(","))
        }

        if (others.length > 0) {
            params.set("other", others.join(","))
        }

        return params.toString()
    }

    const applyFilters = () => {
        const query = createFilterString()
    
        const url = query ? `all-games?${query}` : "all-games"
    
        router.push(url)

        if (isOppennedFilter) handleCloseFilter()
    }
    
    useEffect(() => {
        if (isOppennedFilter) return
        
        const timer = setTimeout(applyFilters, 300)
    
        return () => clearTimeout(timer)
    }, [router, searchParams, priceRange, genres, platforms, languages, others])

    return (
        <section className={`AllGamesFilter ${isOppennedFilter ? "open" : ""}`}>
            <div className="AllGamesFilter__top">
                <h2>Фільтр товарів</h2>

                <button className="AllGamesFilter__closebtn" onClick={handleCloseFilter}><CircleX /></button>
            </div>
            <div className="AllGamesFilter-content">

                <div className="AllGamesFilter-price">
                    <h3>Ціна:</h3>
                    <div className="AllGamesFilter-price__content">
                        <div className="AllGamesFilter-price__label">
                            <span>Від: {priceRange[0]} ₴</span>

                            <span>До: {priceRange[1]} ₴</span>
                        </div>

                        <div className="AllGamesFilter-price__slider">
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={priceRange}
                                onChange={handlePriceRange}
                                valueLabelDisplay="on"
                                valueLabelFormat={(value) => `${value} ₴`}
                                min={availableFilters.prices[0]}
                                max={availableFilters.prices[1]}
                                slotProps={{
                                    valueLabel: {
                                        sx: {
                                            top: 'initial',
                                            bottom: '-60px',
                                            transformOrigin: 'top center',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="AllGamesFilter-checkboxes">
                    <h3>Жанр:</h3>
                    <div className="AllGamesFilter-checkboxes__content">
                        {availableFilters.genres.map((element, index) => {
                            return (
                                <div className="AllGamesFilter-checkbox" key={element.genre + index + "genre"} >
                                    <input onChange={(event) => handleChangeGenres(event, element.genre)} type="checkbox" id={element.genre + index + "genre"} />
                                    <label htmlFor={element.genre + index + "genre"}>{element.genre} <span>{element.counts}</span></label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="AllGamesFilter-checkboxes">
                    <h3>Платформа:</h3>
                    <div className="AllGamesFilter-checkboxes__content">
                        {availableFilters.platforms.map((element, index) => {
                            return (
                                <div className="AllGamesFilter-checkbox" key={element.id + index + "platform"} >
                                    <input onChange={(event) => handleChangePlatforms(event, element.id)} type="checkbox" id={element.id + index + "platform"} />
                                    <label htmlFor={element.id + index + "platform"}>{element.label} <span>{element.count}</span></label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="AllGamesFilter-checkboxes">
                    <h3>Мова:</h3>
                    <div className="AllGamesFilter-checkboxes__content">
                        {availableFilters.languages.map((element, index) => {
                            return (
                                <div className="AllGamesFilter-checkbox" key={element.language + index + "lang"} >
                                    <input onChange={(event) => handleChangeLanguages(event, element.language)} type="checkbox" id={element.language + index + "lang"} />
                                    <label htmlFor={element.language + index + "lang"}>{element.language} <span>{element.counts}</span></label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="AllGamesFilter-checkboxes">
                    <h3>Інше:</h3>
                    <div className="AllGamesFilter-checkboxes__content">
                        {availableFilters.other.map((element, index) => {
                            return (
                                <div className="AllGamesFilter-checkbox" key={element.id + index + "other"} >
                                    <input onChange={(event) => handleChangeOther(event, element.id)} type="checkbox" id={element.id + index + "other"} />
                                    <label htmlFor={element.id + index + "other"}>{element.label} <span>{element.count}</span></label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="AllGamesFilter__submitBtn" onClick={applyFilters}>
                Застосувати
            </div>
        </section>
    )
}

export default AllGamesFilter