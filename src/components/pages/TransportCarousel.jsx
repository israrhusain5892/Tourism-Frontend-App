import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TransportCarousel = () => {
  const sliderRef = useRef(null); // Ref to access slider methods

  const slides = [
    {
      image: 'https://wallpapercave.com/wp/wp2120656.jpg',
      description: 'The world is a book, and those who do not travel read only a page.'
    },
    {
      image: 'https://images.hindustantimes.com/auto/img/2021/12/28/1600x900/Karnataka_electric_bus_1640664297656_1640664306072.jpeg',
      description: 'The world is a canvas, and you are the artist. Paint it with your experiences.'
    },
    {
      image: 'http://www.dailyexcelsior.com/wp-content/uploads/2017/07/119.jpg',
      description: 'Travel is the main thing you purchase that makes you fundamentally richer.'
    },
    {
      image: 'https://www.smartertravel.com/wp-content/uploads/2023/02/AdobeStock_218585163-1024x683.jpeg',
      description: 'Explore. Dream. Discover.'
    },
    // Add more slides as needed
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true, // Adjusts slide height based on the content
    cssEase: 'linear', // Optional: Smoothens the transition
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="w-full mt-20 h-[80vh] overflow-hidden relative">
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="h-[65%] flex justify-center items-end px-4 sm:px-6 md:px-8 lg:px-10">
                <p className="bg-black text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-70 px-4 py-2 text-white mb-4 sm:mb-4 md:mb-12 lg:mb-4">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-16 h-12 sm:w-20 sm:h-12 md:w-24 md:h-20 bg-cover bg-center rounded-md border-2 border-transparent hover:border-white transform hover:scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default TransportCarousel;
