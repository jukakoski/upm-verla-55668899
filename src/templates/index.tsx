import React from "react";
import Container from "../components/container";
import Intro from "../components/intro";
import { HelmetDatoCms } from "gatsby-source-datocms";
import SwiperWrapper from "../components/swiper-wrapper";
import { useKeyboardStream } from "../hooks/hooks"

const Index: React.FC<IndexProps> = ({ pageContext }) => {

  useKeyboardStream()

  const { favicon, locale, seo, seoMetaTags, heroMedia: { video: { mp4Url } }, localeDataArr, allPosts } = pageContext

  const site = { locales: ["en", "fi"] }

  return (
    <Container>
      <HelmetDatoCms seo={seoMetaTags} favicon={favicon} />
      <Intro siteData={site} locale={locale} seo={seo} localeDataArr={localeDataArr} />

      <div style={{ position: "relative", height: "65vh", marginBottom: "3rem" }}>
        <video autoPlay loop style={{pointerEvents: "none", marginLeft: "auto", marginRight: "auto", width: "100%", objectFit: "cover", maxHeight: "65vh" }}>
          <source src={mp4Url} type="video/mp4" />
          <track kind="caption"></track>
        </video>
        <div style={{ position: "absolute", top: 0, left: 0, color: "white", background: "rgba(120, 120, 120, .5)", display: "flex", width: "100%", height: "100%" }}>
          <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto" }}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
              {seo.title}
            </h1>
          </div>
        </div>
      </div>

      <SwiperWrapper allPosts={allPosts} locale={locale} />
    </Container>
  );
}

export default Index

interface IndexProps {
  pageContext: any
}
