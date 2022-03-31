import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import LocalePicker from "./locale-picker";

const Intro: React.FC<IntroProps> = ({ locale, seo, localeDataArr }) => {

  const { title, description, logo } = seo

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-10 md:mb-8">
      <h1 className="text-6xl md:text-8xl font-bolder tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
      {/*       <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {description}{' '}
      </h4> */}

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
