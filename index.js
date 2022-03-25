import React from "react";
import Container from "../components/container";
// import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
// import MoreStories from "../components/more-stories";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";

import { SwiperWrapper } from "../components/swiper-wrapper";

export default function Index({ data: { allPosts, site, blog } }) {

  const lang = "fi"

  const allPostsLang = { nodes: allPosts.nodes.filter(node => node.locale === lang) }

  console.log(allPostsLang)

  // const heroPost = allPostsLang.nodes[0];
  // const morePosts = allPostsLang.nodes.slice(1);


  return (
    <Container>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <Intro siteData={site} />
      <SwiperWrapper allPosts={allPostsLang} />
      <br></br>
      <br></br>
      {/*       {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
    </Container>
  );
}

export const query = graphql`
  {
    site: datoCmsSite {
      locales
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    blog: datoCmsBlog {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
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
