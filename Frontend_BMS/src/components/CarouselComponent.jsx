import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselComponent.css";

const CarouselComponent = () => {
  const slides = [
    {
      id: 1,
      image: "https://image.tmdb.org/t/p/original/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
      title: "Elemental",
    },
    {
      id: 2,
      image: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
      title: "Oppenheimer",
    },
    {
      id: 3,
      image: "https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg",
      title: "Sound of Freedom",
    },
    {
      id: 4,
      image: "https://image.tmdb.org/t/p/original/fIQfdZ6fqf9mIbqBaexbgIEIk5K.jpg",
      title: "Joy Ride",
    },
      
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of images visible
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet and smaller screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
<div className="carousel-wrapper">
  <Slider {...settings}>
    {slides.map((slide) => (
      <div key={slide.id}>
        <img
          src={slide.image}
          alt={slide.title}
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>
    ))}
  </Slider>
</div>


  
  );
};

export default CarouselComponent;
