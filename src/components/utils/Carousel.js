import React, { useState } from 'react';
import "../../styles/carousel.css";

function Carousel ({ images })  {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="carousel">
            <div className="carousel-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((src, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={src} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>
            <div className="carousel-controls">
                <button onClick={goToPrevious}>Previous</button>
                <button onClick={goToNext}>Next</button>
            </div>
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;