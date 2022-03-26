import React from "react";
import Container from "../components/container";
import Intro from "../components/intro";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";
import { SwiperWrapper } from "../components/swiper-wrapper";

export default function Index({ data: { allPosts, site, blog }, pageContext }) {

  const { locale, favicon, globalSeo } = pageContext

  const allPostsLang = { nodes: allPosts.nodes.filter(node => node.locale === locale) }

  return (
    <Container>
      <HelmetDatoCms seo={blog.seo} favicon={favicon} />
      <Intro siteData={site} locale={locale} globalSeo={globalSeo} />
      <SwiperWrapper allPosts={allPostsLang} locale={locale} />
    </Container>
  );
}

export const query = graphql`
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
`;
