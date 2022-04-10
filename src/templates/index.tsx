import React, { useEffect } from "react";
import Container from "../components/container";
import Intro from "../components/intro";
import { HelmetDatoCms } from "gatsby-source-datocms";
import SwiperWrapper from "../components/SwiperWrapper";
import { useKeyboardStream } from "../hooks/hooks"
import SectionSeparator from "../components/SectionSeparator";
import LocalePicker from "../components/LocalePicker";
import HeroVideo from "../components/HeroVideo";
import { Helmet } from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastStyles.css'

const Index: React.FC<IndexProps> = ({ pageContext }) => {

  const { favicon, locale, seo, seoMetaTags, heroVideoUrl, heroVideoOverlayText, productsTitle, localeDataArr, allProducts } = pageContext

  const site = { locales: ["en", "fi"] }

  const [keyboardStream, lastKey, enterKey] = useKeyboardStream(locale)


  useEffect(() => {

    if (enterKey) {
      toast(keyboardStream, {hideProgressBar: false, progressClassName: 'upm-progress-bar' })
    }

  }, [keyboardStream, enterKey])


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

      <ToastContainer  />
    </Container>
  );
}

export default Index

interface IndexProps {
  pageContext: any
}
