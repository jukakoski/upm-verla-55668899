import { Link } from 'gatsby'
import React from 'react'
import './LocalePicker.css'


const LocalePicker: React.FC<LocalePickerProps> = ({ locale, slug, localeDataArr }) => {
    return (
        <div style={{zIndex: 10000}} className="navigation fixed left-0 top-0 w-full h-auto bg-upm-black flex">
            <div className="relative ml-auto mr-0 my-2" style={{ display: "flex" }}>
                {localeDataArr && localeDataArr.filter(localeItem => localeItem.locale !== locale).map(localeItem => (
                    <Link key={localeItem.locale}
                        to={localeItem.locale === "en" ? `/${slug}` : `/${localeItem.locale}/${slug}`}>
                        <img alt="locale-picker" style={{ height: "55px" }} src={localeItem.value.url} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LocalePicker

interface LocalePickerProps {
    locale: string
    slug: string
    localeDataArr: TypeLocaleData[]
}

type TypeLocaleData = {
    locale: string
    value: {
        url: string
    }
}