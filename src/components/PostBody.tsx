import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { StructuredText } from "react-datocms";

const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-2xl prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }: { record: TypeRecord }) => {
            if (record.__typename === "DatoCmsImageBlock" && record?.image?.gatsbyImageData) {
              return <GatsbyImage alt={"textblock image"} image={record.image.gatsbyImageData} />;
            }
            if (record.__typename === "DatoCmsVideoBlock" && record?.video?.url) {
              return (
                <video controls>
                  <source src={record.video.url} type="video/mp4" />
                  <track kind="caption"></track>
                </video>
              )
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

export default PostBody


interface PostBodyProps {
  content: any
}


type TypeRecord = {
  __typename: string
  image?: {
    gatsbyImageData: any
  }
  video?: {
    url: string
  }
}
