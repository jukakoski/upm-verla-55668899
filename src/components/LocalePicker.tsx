import { Link } from 'gatsby'
import React from 'react'

const LocalePicker: React.FC<LocalePickerProps> = ({ locale, slug, localeDataArr }) => {
    return (
        <div style={{}} className="absolute left-0 top-0 w-full h-auto bg-accent-1 flex">
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