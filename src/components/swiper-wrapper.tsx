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

const SwiperWrapper: React.FC<SwiperWrapperProps> = ({ allProducts, locale }) => {
    return (
        <>
            {allProducts.length > 0 ?
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
                    }}
                    navigation={false}
                    modules={[Lazy, Autoplay, Pagination, Navigation, EffectCoverflow]}
                    className="mySwiper mb-16"
                >
                    {allProducts.filter(product => product.locale === locale).map(product => {

                        const postPath = locale === "en" ? `/products/${product.slug}` : `/${locale}/products/${product.slug}`
                        return (
                            <SwiperSlide key={`${product.slug}-${locale}`}>
                                <Link to={postPath} aria-label={product.title}>
                                    <GatsbyImage
                                        image={product.coverImage.large}
                                        alt={`Cover Image for ${product.title}`}
                                        className={cn("shadow-small", {
                                            "hover:shadow-medium transition-shadow duration-200": product.slug,
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

export default SwiperWrapper

interface SwiperWrapperProps {
    allProducts: any[]
    locale: string
}
