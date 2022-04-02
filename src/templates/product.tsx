import React from "react";
import { navigate } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import PostBody from "../components/post-body";
import ProductHeader from "../components/product-header";
import SectionSeparator from "../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useIdleTimer } from "react-idle-timer";
import QRCode from "react-qr-code";
import { useKeyboardStream } from "../hooks/hooks"
import { GatsbyImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import SurveyWrapper from "../components/SurveyWrapper";
import SimpleSurvey from "../components/SimpleSurvey";

const Product: React.FC<ProductProps> = ({ pageContext }) => {

  useKeyboardStream()

  const { product, favicon, pageTitle, url, logo } = pageContext
  const { locale, productMedia, productVideoUrl, slug, surveyTitle, question, thankYou, answers } = product

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
      <SimpleSurvey
        id={slug}
        title={surveyTitle}
        thanksText={thankYou}
        question={question}
        answers={answersParsed}
        locale={locale}/>
      <SectionSeparator />
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