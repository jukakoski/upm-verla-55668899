import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import cn from "classnames";
import { Link } from "gatsby";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import "../styles/swiperStyles.css"

export const SwiperWrapper = ({ allPosts }) => {
    return (
        <>
            {allPosts.nodes.length > 0 ?
                <Swiper
                    slidesPerView={"auto"}
                    lazy={true}
                    effect={"coverflow"}
                    grabCursor={true}
                    loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    spaceBetween={50}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Lazy, Autoplay, Pagination, Navigation, EffectCoverflow]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="mySwiper"
                >
                    {allPosts.nodes.map(post => {
                        console.log(post)
                        return (
                            <SwiperSlide>
                                <Link to={`/posts/${post.slug}`} aria-label={post.title}>
                                    <GatsbyImage
                                        image={post.coverImage.large}
                                        alt={`Cover Image for ${post.title}`}
                                        className={cn("shadow-small", {
                                            "hover:shadow-medium transition-shadow duration-200": post.slug,
                                        })}
                                    />
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper> : "Ei dataa"}
        </>
    )
}
