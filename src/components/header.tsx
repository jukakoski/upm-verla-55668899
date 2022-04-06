import React from "react";
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import { MdArrowBack } from 'react-icons/md';

const Header: React.FC<HeaderProps> = ({ locale, pageTitle, logo }) => {

  const homePath = !locale || locale === 'en' ? '/' : `/${locale}`

  const toHomeText = locale === "en" ? 'Home' : 'Kotiin'

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-32 mb-16 md:mb-12">
      <h2 className="text-2xl md:text-4xl font-bolder tracking-tight leading-tight mb-auto mt-auto">
        <Link to={homePath} className="hover:underline flex">
          <MdArrowBack className="mr-2" />
          {toHomeText}
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
