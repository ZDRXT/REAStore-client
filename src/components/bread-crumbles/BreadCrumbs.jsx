'use client'

import "./BreadCrumbs.scss"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, ChevronsRight } from "lucide-react"

const labels = {
    "all-games": "Всі ігри"
}

const BreadCrumbs = ({ lastLabel }) => {
    const pathname = usePathname()

    const slugs = pathname.split("/").filter(Boolean)

    return (
        <nav aria-label="Breadcrumb" className="breadCrumbs">
            <div className="container">
                <ul className="breadCrumbs-list">
                    <li className="breadCrumbs-item">
                        <Link href={"/"}><House size={24} /></Link>
                    </li>

                    {
                        slugs.map((slug, index) => {
                            const isLast = index === slugs.length - 1

                            const label = isLast && lastLabel ? lastLabel : labels[slug] || slug

                            return (
                                <li key={slug} className="breadCrumbs-item">
                                    <figure><ChevronsRight size={20} /></figure>

                                    {
                                        isLast ? <span>{label}</span> : <Link href={"/" + slug}>{label}</Link>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}

export default BreadCrumbs