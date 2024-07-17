import { Carousel } from "@material-tailwind/react";
import React from 'react';
import 'animate.css';
import Navbar from "../../Navbar/Navbar";

const FeaturedDestinations = () => {
    return (
        <div>
              
            <Carousel
                className="rounded-xl animate__animated animate__fadeIn"
                autoplay
                interval={2000}
                loop
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <div className="relative h-full w-full">
                    <img
                        src="https://kevinstandagephotography.wordpress.com/wp-content/uploads/2021/03/ksp_0329ss.jpg"
                        alt="image 1"
                        className="h-full w-full object-center mx-auto"
                        style={{ height: "70vh" }}
                    />
                    <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-12 text-center animate__animated animate__fadeInUp bg-gray-950 bg-opacity-80 border border-gray-900 border-radius-200">
                        <h2 className="mb-4 text-4xl font-bold text-white">Humayun's Tomb</h2>
                        <p className="text-lg text-white">Explore the grandeur of Mughal architecture in Delhi.</p>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src="https://media1.thrillophilia.com/filestore/pf3hv3jqvrjtt5rotnpr3v6a6y2d_1575268796_shutterstock_1136356946.jpg?w=400&dpr=2"
                        alt="image 2"
                        className="h-full w-full object-center mx-auto"
                        style={{ height: "70vh" }}
                    />
                    <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-12 text-center animate__animated animate__fadeInUp bg-gray-950 bg-opacity-80 border border-gray-900 border-radius-200">
                        <h2 className="mb-4 text-4xl font-bold text-white justify-center">Rishikesh</h2>
                        <p className="text-lg text-white">Experience the adventure activities in Rishikesh.</p>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src="https://www.sommertage.com/wp-content/uploads/2020/03/Agra-Sehensw%C3%BCrdigkeiten-Tipps.jpg"
                        alt="image 3"
                        className="h-full w-full object-center mx-auto"
                        style={{ height: "70vh" }}
                    />
                    <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-12 text-center animate__animated animate__fadeInUp bg-gray-950 bg-opacity-80 border border-gray-900 border-radius-200">
                        <h2 className="mb-4 text-4xl font-bold text-white">Taj Mahal</h2>
                        <p className="text-lg text-white">Marvel at the architectural wonder and symbol of love in Agra.</p>
                    </div>

                </div>
            </Carousel>
        </div>
    );
}

export default FeaturedDestinations;
