"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import "./Hero.scss"

import { EffectCoverflow } from 'swiper/modules';
import { useState, useEffect } from 'react';

import gameService from '@/services/games';

const Hero = ({ games }) => {
    const [randomGames, setRandomGames] = useState([])

    useEffect(() => {
        if (!games) return
        const result = gameService.getRandomGames(games, 6)
        setRandomGames(result)
    }, [games])

    if (randomGames.length === 0) return null

    return (
        <section className="Hero">
            <div className="container">
                <div className="Hero-swiper">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop="true"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 50,
                            modifier: 3,
                            slideShadows: false,
                            scale: 1,
                        }}
                        spaceBetween={30}
                        breakpoints={{
                            768: {
                                spaceBetween: 120
                            }
                        }}
                        modules={[EffectCoverflow]}
                        className="mySwiper"
                    >
                        {
                            randomGames.map(game => {
                                return (
                                    <SwiperSlide>
                                        <div className="Hero-card">
                                            <img src={game.prev_image} alt="prev_image" />

                                            <div className="Hero-card_wrapper">
                                                <div className="Hero-card__title">{game.name}</div>
                                                <span>{game.price} ₴</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Hero



//   <div className="heroslider-mobile">
//       <Swiper
//         effect={'coverflow'}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={'auto'}
//         loop={true}
//         lazy="true"
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: -15,
//           depth: 100,
//           modifier: 3,
//           slideShadows: false,
//           scale: 1
//         }}
//         modules={[EffectCoverflow, Autoplay]}
//         className="heroslider-swiper"
//       >
//         {heroImages.map((src, index) => (
//           <SwiperSlide key={index}>
//             <Image
//               src={src}
//               alt={`Hero photo ${index + 1}`}
//               width={284}
//               height={300}
//               priority={index < 2}
//               loading={index < 2 ? "eager" : "lazy"}
//               sizes="284px"
//               placeholder="blur"
//               blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmFmYWZhIi8+Cjwvc3ZnPgo="
//               style={{
//                 objectFit: 'cover',
//                 borderRadius: '8px'
//               }}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
