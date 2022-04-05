import React from "react";
import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "./CoverImage";
import { Link } from "gatsby";

export default function HeroPost({
  title,
  coverImage,
  slug,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} fluid={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link to={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>
      </div>
    </section>
  );
}
