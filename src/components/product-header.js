import React from "react";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

export default function ProductHeader({ title, coverImage }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} fluid={coverImage?.gatsbyImageData} />
      </div>
      <div className="max-w-2xl mx-auto">
      </div>
    </>
  );
}
