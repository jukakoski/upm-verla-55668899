import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import Container from "../components/Container";
import Header from "../components/Header";
import PostBody from "../components/PostBody";
import ProductHeader from "../components/ProductHeader";
import SectionSeparator from "../components/SectionSeparator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useIdleTimer } from "react-idle-timer";
import QRCode from "react-qr-code";
import { useKeyboardStream } from "../hooks/hooks"
import { GatsbyImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import SimpleSurvey from "../components/SimpleSurvey";
import LocalePicker from "../components/LocalePicker";

const Product: React.FC<ProductProps> = ({ pageContext }) => {

  const [urlParams, setUrlParams] = useState<URLSearchParams | null>();
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams) {
        setUrlParams(urlParams);
      }
    }
  }, []);

  const { product, favicon, pageTitle, url, logo, localeDataArr } = pageContext
  const { locale, productMedia, productVideoUrl, slug, surveyTitle, question, thankYou, answers } = product

  useKeyboardStream(locale)

  const timeoutTimeInSeconds = 600;


  let answersParsed: AnswerModel[] = []
  if (answers) {
    try {
      answersParsed = JSON.parse(answers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnIdle = () => {
    const home = !locale || locale === 'en' ? '/' : `/${locale}`
    navigate(home);
  };

  useIdleTimer({
    timeout: 1000 * timeoutTimeInSeconds,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return (
    <Container>
      <Helmet htmlAttributes={{ lang: locale }} />
      <HelmetDatoCms seo={product.seo} favicon={favicon} />

      <LocalePicker locale={locale} slug={`products/${slug}`} localeDataArr={localeDataArr} />

      <Header locale={locale} pageTitle={pageTitle} logo={logo} />
      <article>
        <ProductHeader
          title={product.title}
          coverImage={product.coverImage}
        />
        <div className="grid md:grid-cols-2 gap-4">

          <div>
            {productVideoUrl &&
              <video autoPlay loop muted controlsList="noplaybackrate nodownload" style={{ pointerEvents: "none" }}>
                <source src={productVideoUrl} type="video/mp4" />
                <track kind="caption"></track>
              </video>
            }

            {productMedia && productMedia.isImage &&
              <GatsbyImage alt="product-image" image={productMedia.gatsbyImage} />
            }
          </div>

          <PostBody content={product.content} />

        </div>

      </article>

      <SectionSeparator />
      {urlParams && urlParams.get("s") === "1" &&
        <>
          <SimpleSurvey
            id={slug}
            title={surveyTitle}
            thanksText={thankYou}
            question={question}
            answers={answersParsed}
            locale={locale} />
          <SectionSeparator />
        </>
      }


      {/*       <SurveyWrapper /> */}
      <QRCode style={{ marginLeft: "auto", marginTop: "4rem", marginBottom: "4rem", marginRight: "auto" }} value={url} size={128} />
    </Container>
  )
}

export default Product

interface ProductProps {
  pageContext: any
}

export type AnswerModel = {
  name: string
  fi: string
  en: string
}