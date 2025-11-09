import "./NotFound.scss"

import Link from "next/link"

import { Squirrel } from "lucide-react"

const NotFound = ({ text = "Цю сторінку не знайдено", link="/", linkText="На головну" }) => {  
    return (
        <div className="notFound">
            <Squirrel />

            <h2>Ой халепа...</h2>

            <p>{text}</p>

            <Link href={link} className="btn">{linkText}</Link>
        </div>
    )
}

export default NotFound