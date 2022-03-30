import React from "react";
import Container from "../components/container";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";
import { SwiperWrapper } from "../components/swiper-wrapper";
import { useKeyboardStream } from "../hooks/hooks"

export default function Index({ pageContext }) { // data: { allPosts, site, blog },

  useKeyboardStream()

  const { locale, favicon, seo, heroMedia: { video: { thumbnailUrl, mp4Url } }, localeDataArr, allPosts } = pageContext

  const site = { locales: ["en", "fi"] }

  //  const allPostsLang = { nodes: allPosts.nodes.filter(node => node.locale === locale) }

  // const heroPost = allPostsLang.nodes[0];

  return (
    <Container>
      <Intro siteData={site} locale={locale} seo={seo} localeDataArr={localeDataArr} />

      <div style={{ position: "relative", height: "65vh", marginBottom: "3rem" }}>
        <video autoPlay loop style={{ marginLeft: "auto", marginRight: "auto", width: "100%", objectFit: "cover", maxHeight: "65vh" }}>
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
{/*       {thumbnailUrl && (
        <HeroPost
          title={seo.title}
          coverImage={thumbnailUrl}
          slug="testi"
        />
      )} */}

    <SwiperWrapper allPosts={allPosts} locale={locale} />
    </Container>
  );
}

/* export const query = graphql`
query IndexQuery($locale: String!){
    site: datoCmsSite {
        locales
      }
    blog: datoCmsBlog {
      seo: seoMetaTags {
        tags
      }
    }
    allPosts: allDatoCmsPost(
      filter: { locale: { eq: $locale } }
      sort: { fields: date, order: DESC },
      limit: 20
      ) {
      nodes {
        locale
        title
        slug
        excerpt
        date
        coverImage {
          large: gatsbyImageData(width: 1500)
          small: gatsbyImageData(width: 760)
        }
        author {
          name
          picture {
            gatsbyImageData(
              layout: FIXED
              width: 48
              height: 48
              imgixParams: { sat: -100 }
            )
          }
        }
      }
    }
  }
`; */
