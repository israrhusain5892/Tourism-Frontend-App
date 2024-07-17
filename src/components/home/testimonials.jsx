import React, { useState, useEffect } from 'react';
import Raj from '../../components/assets/Raj_Kumar.jpg'
import Neha from '../../components/assets/Neha_Sharma.jpg'
import Priya from '../../components/assets/Priya_Gupta.jpg'
import Aditya from '../../components/assets/Aditya_Kapoor.jpg'
import Sadiq from '../../components/assets/Sadiq_Basha.jpg'
import Nayum from '../../components/assets/Nayum.jpg'
import Aisha from '../../components/assets/Aisha.jpg'
import Navbar from '../Navbar/Navbar';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TestimonialsSlider = () => {
    const testimonials = [
        {
            quote: "I was impressed by the attention to detail and the personalized service provided by the Indian tourism website. They made sure we experienced the true essence of India during our trip.",
            author: "Raj Kumar",
            city: "Delhi",
            image: Raj,
            rating: 5
        },
        {
            quote: "The team at the Indian tourism website was incredibly helpful in planning our trip. They tailored the itinerary to our preferences and made sure we had an unforgettable experience.",
            author: "Neha Sharma",
            city: "Mumbai",
            image: Neha,
            rating: 4.5
        },
        {
            quote: "The Indian tourism website provided us with an unforgettable experience. The guides were knowledgeable and the accommodations were top-notch. We can't wait to plan our next trip with them.",
            author: "Priya Gupta",
            city: "Punjab",
            image: Priya,
            rating: 3.5
        },
        {
            quote: "The Indian tourism website made planning our trip to India a breeze. They took care of all the logistics and recommended the best places to visit. We had an amazing time and can't wait to go back.",
            author: "Aditya Kapoor",
            city: "Chennai",
            image: Aditya,
            rating: 1.5
        },
        {
            quote: "The tour package was amazing! The guides were knowledgeable and the itinerary was well-planned. I had a wonderful time exploring the cultural and historical sights of India.",
            author: "Sadiq Basha",
            city: "Bangalore",
            image: Sadiq,
            rating: 4.5
        },
        {
            quote: 'I had an incredible experience with your tourism services. The attention to detail and personalized itinerary made my trip to India unforgettable. I would highly recommend your company to anyone looking to explore the wonders of this beautiful country.',
            author: "Nayum",
            city: "Hyderabad",
            image: Nayum,
            rating: 4
        },
        {
            quote: "I was blown away by the level of service and attention to detail provided by your team. The transportation, accommodations, and activities were all top-notch. I can't wait to plan my next trip to India with your help.",
            author: "Aisha Khan",
            city: "Vizag",
            image: Aisha,
            rating: 3
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="w-6 h-6 fill-current text-yellow-500" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(<FaStarHalfAlt key={i} className="w-6 h-6 fill-current text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="w-6 h-6 fill-current text-yellow-500" />);
            }
        }
        return stars;
    };

    return (
        <section className="bg-gray-100 py-16">
              <Navbar/>
            <div className="max-w-3xl mx-auto relative">
                <h2 className="text-5xl font-bold text-center text-[#600180] mb-8">What Our Clients Say</h2>
                {/* <p className="">Hear from our happy customers about their experiences with our Indian tourism services.</p> */}
                <p className="text-center text-xl italic text-gray-600 mb-1 md:mb-1">Hear from our happy customers about their experiences with our Indian tourism services.</p>
                <div className="overflow-hidden">
                    <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="w-full flex-shrink-0 flex items-center justify-center px-8 py-8">
                                <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto flex flex-col items-center">
                                    <img src={testimonial.image} alt={testimonial.author} className="w-40 h-40 rounded-full mb-4 object-cover" />
                                    <div className="text-lg text-center font-bold italic text-gray-500 mb-4">{testimonial.quote}</div>
                                    <div className="flex mb-2">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <div className="text-[#600180] text-2xl font-semibold">{testimonial.author}</div>
                                    <div className="text-gray-500 ">{testimonial.city}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="absolute top-[350px] transform -translate-y-1/2 left-0 w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none" onClick={prevSlide}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="absolute top-[350px] transform -translate-y-1/2 right-0 w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none" onClick={nextSlide}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default TestimonialsSlider;
