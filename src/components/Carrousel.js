
import articlesList from'../data/articlesList';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Pagination, Navigation , Mousewheel, Keyboard, Autoplay} from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
       {articlesList.map(articles=>(
            <SwiperSlide key={articles.position}>
                <div className="article">
                <div className="article__content">
                <div className="article__content__title">{articles.title}</div>
                <div className="article__content__image"><img src={articles.img} alt={articles.img}/></div>
                </div>
                <div className="article__text">{articles.txt}</div>
            
            </div>
            </SwiperSlide>
       ))}
        
        
        
      </Swiper>
    </>
  );
}
