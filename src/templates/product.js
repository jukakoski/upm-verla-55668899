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

export default function Product({ pageContext }) {

  useKeyboardStream()

  const { product, favicon, pageTitle, url } = pageContext
  const { locale, productMedia } = product

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
      <HelmetDatoCms seo={product.seo} favicon={favicon} />
      <Header locale={locale} pageTitle={pageTitle} />
      <article>
        <ProductHeader
          title={product.title}
          coverImage={product.coverImage}
          date={product.date}
          author={product.author}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            {productMedia && productMedia.video &&
              <video autoPlay loop>
                <source src={productMedia.video.mp4Url} type="video/mp4" />
                <track kind="caption"></track>
              </video>
            }
          </div>
          <div>
            <PostBody content={product.content} />
          </div>

        </div>


        <QRCode style={{ marginLeft: "auto", marginTop: "2rem", marginRight: "auto" }} value={url} size={128} />
      </article>
      <SectionSeparator />
    </Container>
  );
}