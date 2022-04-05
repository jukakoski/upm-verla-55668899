import React from "react";
import { navigate } from "gatsby";
import Container from "../components/Container";
import Header from "../components/Header";
import PostBody from "../components/PostBody";
import PostHeader from "../components/post-header";
import SectionSeparator from "../components/SectionSeparator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useIdleTimer } from "react-idle-timer";
import QRCode from "react-qr-code";
import { useKeyboardStream } from "../hooks/hooks"

export default function Post({ pageContext }) {

  useKeyboardStream()

  const { post, favicon, pageTitle, url } = pageContext
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
      <Header locale={locale} pageTitle={pageTitle} />
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
        <QRCode style={{ marginLeft: "auto", marginTop: "2rem", marginRight: "auto" }} value={url} size={128} />
      </article>
      <SectionSeparator />
    </Container>
  );
}