import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default function Intro({ siteData, locale, seo, localeDataArr }) {

  const { locales } = siteData

  const { title, description, logo } = seo

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
      {/*       <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {description}{' '}
      </h4> */}
      <div style={{ display: "flex" }}>
        {localeDataArr && localeDataArr.map(localeItem => <Link key={localeItem.locale}
          style={{
            marginRight: '0.5rem',
            color: locale === localeItem ? '#00854C' : 'unset',
            fontWeight: locale === localeItem ? 'bold' : 'unset'
          }}
          to={localeItem.locale === "en" ? '/' : `/${localeItem.locale}`}>
          <img style={{ height: "55px" }} src={localeItem.value.url} />
          {/*           {localeItem.locale} */}
        </Link>)}
      </div>

      <GatsbyImage image={logo.small} />
    </section>
  )
}
