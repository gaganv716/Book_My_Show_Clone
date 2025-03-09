import React, { useRef } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarouselComponent.css";

import slide1 from "../assets/Gpay3.png";
import slide2 from "../assets/oppenheimer.jpg";
import slide3 from "../assets/CABNW3.png";

const slides = [
    { id: 1, image: slide1, title: "Exciting Movie Premieres" },
    { id: 2, image: slide2, title: "Exclusive Discounts" },
    { id: 3, image: slide3, title: "IMAX & 4DX Experience" },
];

const CarouselComponent = () => {
    const carouselRef = useRef(null);

    const nextSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    const prevSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    return (
        <div className="carousel-wrapper">
            <button className="carousel-btn left" onClick={prevSlide}>‹</button>
            <Carousel fade interval={3000} indicators={true} controls={false} ref={carouselRef}>
                {slides.map((slide) => (
                    <Carousel.Item key={slide.id}>
                        <div className="carousel-container">
                            <img className="carousel-image" src={slide.image} alt={slide.title} />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <button className="carousel-btn right" onClick={nextSlide}>›</button>
        </div>
    );
};

export default CarouselComponent;
