import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useState } from "react";
import styles from "./style.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { AsideRight } from "../AsideRight";
import { AsideLeft } from "../AsideLeft";
import { PostContext } from "../../../providers/PostContext";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/imgs/fake.png";
import noImage from "../../../assets/imgs/noImage.jpg";

export const BannerSection = () => {
  const [slidePerView, setSlidePerView] = useState(1);
  const { setFilteredPost, postList} = useContext(PostContext);

  const navigate = useNavigate()
  // Ordena os posts pelas noticias mais recentes
  const sortedPosts = postList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const handleCategoryClick = (postId, e) => {
    e.preventDefault();
    const post = sortedPosts.find(post => post.id === postId);
    if (post) {
      setFilteredPost([post]);
      console.log(post)
      navigate(`/post/${postId}`); 
    } else {
      console.log("Post não encontrado.");
    }
  };

  return (
    <section className="container">
    <div className={styles.flexBox}>
      <AsideRight />
      <Swiper
        className={styles.customSwiper}
        pagination={{ clickable: true }}
        slidesPerView={slidePerView}
        modules={[Pagination, Navigation, EffectFade]}
        effect="fade"
      >
        {sortedPosts.map((item) => (
            <SwiperSlide 
            className={styles.slideItem} 
            key={item.id}
          >
            <div 
              onClick={(e) => handleCategoryClick(item.id, e)}  
              className={styles.imageContainer}
            >             
                <img 
                  src={item.photoUrls.length !== 0 ? item.photoUrls[0] : noImage} 
                  alt="Slider"                   
                />                  
                <div className={styles.overlay}>
                  {item.categories.length !== 0 ? (
                    <h1 className="title one">
                      {item.categories[0].name}
                    </h1>
                  ) : (
                    <h1 className="title one">
                      Sem categoria
                    </h1>
                  )}
                  {item.title && (
                  <p className="title three">
                    {item.title}
                  </p>
                  )}
              </div>
            </div>
          </SwiperSlide>
        ))}
          <strong>
            <img src={img} alt="" />
          </strong>
      </Swiper>
      <AsideLeft />
    </div>
  </section>
  
  );
};
