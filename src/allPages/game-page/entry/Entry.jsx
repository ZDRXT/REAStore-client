'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { Flame } from 'lucide-react';

import "./Entry.scss"

import AddToBasketBtn from '@/components/add-to-basket-btn/AddToBasketBtn';


import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';

const Entry = ({ game }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { name, available, reviews, price, prev_image, hot_game, discount, key_words, genre, platforms } = game

    return (
        <section className="Entry" id='Entry'>
            <div className="container">
                <div className="Entry-wrapper">
                    <div className="Entry-gallery">
                        <div className="Entry-gallery__secondary">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                direction='vertical'
                                loop={true}
                                spaceBetween={5}
                                slidesPerView={"auto"}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="Entry-gallery__secondary--slider"
                                breakpoints={{
                                    1024: {
                                        spaceBetween: 10,
                                    },
                                }}
                            >
                                {game.gallery.map((img, index) => {
                                    return (
                                        <SwiperSlide key={"photo-secondary" + index}>
                                            <img alt={"photo" + index} src={img} />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>

                        <div className="Entry-gallery__main">
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="Entry-gallery__main--slider"
                            >
                                {game.gallery.map((img, index) => {
                                    return (
                                        <SwiperSlide key={"photo-main" + index}>
                                            <img alt={"photo" + index} src={img} />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>

                    <div className="Entry-content">
                        <h1>{name}</h1>

                        <div className="Entry-content__badges">
                            {hot_game ? <div className="Entry-content__badge Entry-content__badge--hot"><Flame size={26} /></div> : ""}
                            {discount ? <div className="Entry-content__badge Entry-content__badge--discount">&#9590; {(discount * 100).toFixed()} %</div> : ""}
                            <div className="Entry-content__badge Entry-content__badge--stock">{available ? <span className="green">В наявності</span> : <span className="red">Не в наявності</span>}</div>
                        </div>

                        <div className="Entry-content__price">
                            <div className="Entry-content__price--current">{price} ₴</div>
                            {discount ? <div className="Entry-content__price--full">{(price + price * discount).toFixed()} ₴</div> : ""}
                        </div>

                        {discount ? <div className="Entry-content__special">
                            <p>Ви заощаджуєте: {(price * discount).toFixed()} ₴</p>
                        </div> : ""}

                        <div className="Entry-content__button">
                            <AddToBasketBtn type='large' productId={game.id}/>
                        </div>

                        <div className="divider"></div>

                        <div className="Entry-content__genres">
                            <div className="Entry-content__genres--title">Жанр:</div>
                            <div className="Entry-content__genres--content">{genre.map((element, index) => {
                                return (
                                    <div key={"genre" + index} className="Entry-content__genres--genre">{element}</div>
                                )
                            })}</div>
                        </div>

                        <div className="Entry-content__platforms">
                            <div className="Entry-content__platforms--title">Платформи:</div>
                            <div className="Entry-content__platforms--content">{platforms.map((element, index) => {
                                return (
                                    <div key={"platform" + index} className="Entry-content__platforms--platform">{element.label}</div>
                                )
                            })}</div>
                        </div>

                        <div className="Entry-content__keywords">
                            <div className="Entry-content__keywords--title">Ключові слова:</div>
                            <div className="Entry-content__keywords--content">{key_words.map((element, index) => {
                                return (
                                    <div key={"keywords" + index} className="Entry-content__keywords--keyword">{element}</div>
                                )
                            })}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Entry