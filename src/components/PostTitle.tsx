import React from "react";

const PostTitle: React.FC = ({ children }) => {
  return (
    <h3 className="text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-none mb-10 text-center md:text-left">
      {children}
    </h3>
  )
}

export default PostTitle