import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const Intro: React.FC<IntroProps> = ({ seo }) => {

  const { title, description, logo } = seo

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-14 md:mt-16 mb-10 md:mb-8">
      <div className="text-center md:text-left">
        <h3 className="text-3xl mt-5 text-upm-dark-grey">
          {description}{' '}
        </h3>
        <h1 className="text-6xl md:text-7xl leading-tight">
          {title}
        </h1>
      </div>

      <GatsbyImage alt="upm-logo" className="md:none" image={logo.small} />
    </section>
  )
}

export default Intro
interface IntroProps {
  siteData: any
  locale: string
  seo: {
    title: string
    description: string
    logo: any
  }
  localeDataArr: any[]
}
