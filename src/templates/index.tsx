import React from "react";
import Container from "../components/container";
import Intro from "../components/intro";
import { HelmetDatoCms } from "gatsby-source-datocms";
import SwiperWrapper from "../components/swiper-wrapper";
import { useKeyboardStream } from "../hooks/hooks"
import SectionSeparator from "../components/section-separator";
import LocalePicker from "../components/locale-picker";
import HeroVideo from "../components/HeroVideo";
import { Helmet } from 'react-helmet'

const Index: React.FC<IndexProps> = ({ pageContext }) => {

  const { favicon, locale, seo, seoMetaTags, heroVideoUrl, heroVideoOverlayText, productsTitle, localeDataArr, allProducts } = pageContext

  const site = { locales: ["en", "fi"] }

  useKeyboardStream(locale)

  return (
    <Container>
      <Helmet htmlAttributes={{ lang: locale }} />
      <HelmetDatoCms seo={seoMetaTags} favicon={favicon} />

      <LocalePicker locale={locale} slug="" localeDataArr={localeDataArr} />

      <Intro siteData={site} locale={locale} seo={seo} localeDataArr={localeDataArr} />
      <HeroVideo videoUrl={heroVideoUrl} overlayText={heroVideoOverlayText} />

      <SectionSeparator />

      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bolder tracking-tighter leading-tight md:leading-none mb-12 text-center">
        {productsTitle}
      </h3>
      <SwiperWrapper allProducts={allProducts} locale={locale} />

    </Container>
  );
}

export default Index

interface IndexProps {
  pageContext: any
}
