import React, {useEffect} from "react";
import { graphql, navigate } from "gatsby";
import Container from "../../components/container";
import Header from "../../components/header";
// import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useIdleTimer } from 'react-idle-timer'

export default function Post({ data: { site, post, morePosts } }) {

  useEffect(() => {
      console.log('posti', post)
  }, [post])


  const timeoutTimeInSeconds = 10

  const handleOnIdle = event => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
    navigate("/")
  }

  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = event => {
    console.log('user did something', event)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * timeoutTimeInSeconds,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  return (
    <Container>
      <HelmetDatoCms seo={post.seo} favicon={site.favicon} />
      <Header />
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
      <SectionSeparator />
      {/*       {morePosts.nodes.length > 0 && <MoreStories posts={morePosts.nodes} />} */}
    </Container>
  );
}

/*          __typename
          id: originalId
          image {
            gatsbyImageData(width: 700)
          }  */

export const query = graphql`
  query PostBySlug($id: String) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsPost(id: { eq: $id }) {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      locale
      title
      slug
      content {
        value
          blocks {
          __typename
          ... on DatoCmsImageBlock {
            id: originalId
            image {
              gatsbyImageData(width: 700)
            }
          }
          ... on DatoCmsVideoBlock {
            id: originalId
            video{
                url
                video{
                  thumbnailUrl
                }
            }
          }
        }
      }
      date
      coverImage {
        gatsbyImageData(width: 1500)
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
    morePosts: allDatoCmsPost(
      sort: { fields: date, order: DESC }
      limit: 2
      filter: { id: { ne: $id } }
    ) {
      nodes {
        locale
        title
        slug
        excerpt
        date
        coverImage {
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
