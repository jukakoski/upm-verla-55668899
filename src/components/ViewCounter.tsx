

import React from 'react'
import { useStatistics } from '../hooks/hooks'

const ViewCounter: React.FC<ViewCounterProps> = ({ id, locale }) => {

    const { busy, views, host, urlParams } = useStatistics(id)

    const title = locale === "fi" ? "Katseluja" : "Views"

    if (urlParams && urlParams.get("s") === "1") {
        if (host === "localhost") {
            return (
                <div>{title} 9999</div>
            )
        } else {
            return (
                <div>{title} {views}</div>
            )
        }
    } else {
        return null
    }

}

export default ViewCounter


interface ViewCounterProps {
    id: string
    locale: string
}