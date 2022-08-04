import articlesList from'../data/articlesList';
import Article from './Article';

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
       {articlesList.map(articles=>(<SwiperSlide key={articles.position} >
         <Article articles={articles}/>
       </SwiperSlide>))}
      </Swiper>
    </>
  );
}
