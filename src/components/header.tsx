import React from "react";
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

const Header: React.FC<HeaderProps> = ({ locale, pageTitle, logo }) => {

  const homePath = !locale || locale === 'en' ? '/' : `/${locale}`

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-auto mt-auto">
        <Link to={homePath} className="hover:underline">
          {pageTitle}
        </Link>
      </h2>
      <GatsbyImage alt="upm-logo" className="md:none" image={logo.small} />
    </section>
  )
}

export default Header

interface HeaderProps {
  locale: string
  pageTitle: string
  logo: any
}
