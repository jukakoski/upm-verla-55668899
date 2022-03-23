import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { StructuredText } from "react-datocms";

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "DatoCmsImageBlock") {
              return <GatsbyImage image={record.image.gatsbyImageData} />;
            }
            if (record.__typename === "DatoCmsVideoBlock") {
              return <video controls>
                <source src={record.video.url} type="video/mp4" />
                <track kind="caption"></track>
              </video>;
            }
            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
