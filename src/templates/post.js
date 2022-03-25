import React, { useEffect } from "react";
import { graphql, navigate } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import PostBody from "../components/post-body";
import PostHeader from "../components/post-header";
import SectionSeparator from "../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useIdleTimer } from "react-idle-timer";

export default function Post({ pageContext }) {

  const { locale, post } = pageContext

  useEffect(() => {
    console.log("posti", post);
  }, [post]);

  const timeoutTimeInSeconds = 10;

  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());
    navigate("/");
  };

  const handleOnActive = (event) => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (event) => {
    console.log("user did something", event);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * timeoutTimeInSeconds,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <Container>
      {/*       <HelmetDatoCms seo={post.seo} favicon={site.favicon} /> */}
      <Header />
      {locale}
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
    </Container>
  );
}




/* export const query = graphql`
  query PostBySlug($id: String, $locale: String) {
    post: datoCmsPost(id: { eq: $id }, locale: {eq: $locale}) {
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
            video {
              url
              video {
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
  }` */