"use client"

import "./AllGamesPage.scss"

import AllGamesFilter from "./AllGamesFilter/AllGamesFilter"
import AllGamesContent from "./AllGamesContent/AllGamesContent"

import { useState } from "react"

const AllGamesPage = ({availableFilters, filteredGames, filterParams}) => {
    const [isOppennedFilter, setIsOppennedFilter] = useState(false)

    const handleOpenFilter = () => {
        setIsOppennedFilter(true)
    } 

    const handleCloseFilter = () => {
        setIsOppennedFilter(false)
    } 

    return (
        <main className="AllGamesPage">
            <div className="container">
                <div className="AllGamesPage-wrapper">
                    <AllGamesFilter availableFilters={availableFilters} isOppennedFilter={isOppennedFilter} handleCloseFilter={handleCloseFilter} />
                    <AllGamesContent filteredGames={filteredGames} isOppennedFilter={isOppennedFilter} handleOpenFilter={handleOpenFilter} filterParams={filterParams} />
                </div>
            </div>
        </main>
    )
}

export default AllGamesPage