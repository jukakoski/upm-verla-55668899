import React from "react";
import { navigate } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import PostBody from "../components/post-body";
import PostHeader from "../components/post-header";
import SectionSeparator from "../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useIdleTimer } from "react-idle-timer";

export default function Post({ pageContext }) {

  const { post, favicon } = pageContext
  const { locale } = post

  const timeoutTimeInSeconds = 10;

  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());

    const home = !locale || locale === 'en' ? '/' : `/${locale}`

    navigate(home);
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
      <HelmetDatoCms seo={post.seo} favicon={favicon} />
      <Header locale={locale} />
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