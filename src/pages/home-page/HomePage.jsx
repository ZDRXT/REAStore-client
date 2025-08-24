"use client"

import Hero from "./hero/Hero"

const HomePage = ({games}) => {
    return (
        <main>
            <Hero games={games}/>
        </main>
    )
}

export default HomePage