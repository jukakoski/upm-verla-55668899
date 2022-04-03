import { Link } from 'gatsby'
import React from 'react'

const LocalePicker: React.FC<LocalePickerProps> = ({ locale, slug, localeDataArr }) => {
    return (
        <div className="absolute top-4 right-0" style={{ display: "flex" }}>
            {localeDataArr && localeDataArr.filter(localeItem => localeItem.locale !== locale).map(localeItem => (
                <Link key={localeItem.locale}
                    to={localeItem.locale === "en" ? `/${slug}` : `/${localeItem.locale}/${slug}`}>
                    <img alt="locale-picker" style={{ height: "55px" }} src={localeItem.value.url} />
                </Link>
            ))}
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