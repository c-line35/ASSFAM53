
import articlesList from'../data/articlesList';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";



// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

export default function Carrousel() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"2"}
        coverflowEffect={{
          rotate: -50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay:2500,
            disableOnInteraction: true,
          }}
      >
       {articlesList.map(articles=>(
            <SwiperSlide key={articles.position}>
                <div className="article">
                <div className="article__content">
                <div className="article__content__title">{articles.title}</div>
                <div className="article__content__image"><img src={articles.img} alt={articles.img}/></div>
                <div className="article__content__text">{articles.txt}</div>
            </div>
            </div>
            </SwiperSlide>
       ))}
        
        
        
      </Swiper>
    </>
  );
}
