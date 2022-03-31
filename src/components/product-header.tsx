import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import PostTitle from "./post-title";

const ProductHeader: React.FC<ProductHeaderProps> = ({ title, coverImage }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
{/*       <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage slug={title} title={title} fluid={coverImage?.gatsbyImageData} />
      </div> */}
{/*       <div className="max-w-2xl mx-auto">
      </div> */}
    </>
  );
}

export default ProductHeader

interface ProductHeaderProps {
  title: string
  coverImage: {
    gatsbyImageData: IGatsbyImageData
  }
}
