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

export const SwiperWrapper = ({ allPosts, locale }) => {
    return (
        <>
            {allPosts.length > 0 ?
                <Swiper

                    autoHeight={false}
                    speed={800}
                    slidesPerView={"auto"}
                    lazy={true}
                    effect={"coverflow"}
                    grabCursor={false}
                    loop={true}
                    coverflowEffect={{
                        rotate: 60,
                        scale: 0.7,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    spaceBetween={50}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: false,
                        // type: "custom"
                    }}
                    navigation={false}
                    modules={[Lazy, Autoplay, Pagination, Navigation, EffectCoverflow]}
/*                     onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)} */
                    className="mySwiper"
                >
                    {allPosts.map(post => {

                        const postPath = locale === "en" ? `/products/${post.slug}` : `/${locale}/products/${post.slug}`
                        console.log(post)
                        return (
                            <SwiperSlide key={post.slug}>
                                <Link to={postPath} aria-label={post.title}>
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
