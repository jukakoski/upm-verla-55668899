import React from "react";
import { Link } from "gatsby";

export default function Intro({ siteData, locale, globalSeo }) {

  const { locales } = siteData

  const { fallbackSeo: { title, description } } = globalSeo

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {description}{' '}
        {locales && locales.map(localeItem => <Link
          style={{
            marginRight: '0.5rem',
            color: locale === localeItem ? '#00854C' : 'unset',
            fontWeight: locale === localeItem ? 'bold' : 'unset'
          }}
          to={localeItem === "en" ? '/' : `/${localeItem}`}>
          {localeItem}
        </Link>)}
      </h4>
    </section>
  )
}
