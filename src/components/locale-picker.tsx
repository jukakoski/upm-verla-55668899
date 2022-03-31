import { Link } from 'gatsby'
import React from 'react'

const LocalePicker: React.FC<LocalePickerProps> = ({ locale, localeDataArr }) => {
    return (
        <div className="absolute top-4 right-0" style={{ display: "flex" }}>
            {localeDataArr && localeDataArr.filter(localeItem => localeItem.locale !== locale).map(localeItem => (
                <Link key={localeItem.locale}
                    to={localeItem.locale === "en" ? '/' : `/${localeItem.locale}`}>
                    <img style={{ height: "55px" }} src={localeItem.value.url} />
                </Link>
            ))}
        </div>
    )
}

export default LocalePicker

interface LocalePickerProps {
    locale: string
    localeDataArr: any
}