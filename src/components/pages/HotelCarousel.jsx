import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HotelCarousel = () => {
  const sliderRef = useRef(null); // Ref to access slider methods

  const slides = [
    {
      image: 'https://i.pinimg.com/originals/bc/5b/78/bc5b780990cd800137855a5b7f121156.jpg',
      description: 'Interior design of the hotel room'
    },
    {
      image: 'https://images.pexels.com/photos/3068519/pexels-photo-3068519.jpeg?cs=srgb&dl=lounge-chairs-with-umbrella-near-swimming-pool-3068519.jpg&fm=jpg',
      description: 'Swimming pool with loungers and umbrellas'
    },
    {
      image: 'https://photos.mandarinoriental.com/is/image/MandarinOriental/dmo-The-worlds-most-romantic-hotel-suites-dubai-royal-penthouse-bedroom',
      description: 'Luxurious hotel bedroom with elegant decor'
    },
    {
      image: 'https://www.diningandlivingroom.com/wp-content/uploads/2017/06/8-Dining-Room-Tables-Perfect-for-a-Luxury-Set8.jpg',
      description: 'Dining room with tables set for fine dining'
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
    <div className="w-full mt-20 max-h-[75vh] overflow-hidden relative">
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="h-[75vh] sm:h-[60vh] md:h-[50vh] lg:h-[75vh] bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="h-[80%] flex justify-center items-end px-4 sm:px-6 md:px-8 lg:px-10">
                <p className="bg-black text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-70 px-4 py-2 text-white mb-4 sm:mb-4 md:mb-12  lg:mb-4">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 ">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16 bg-cover bg-center rounded-md border-2 border-transparent hover:border-white transform hover:scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelCarousel;
