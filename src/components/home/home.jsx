import React, { useState } from "react";
import CarouselDarkVariant from "./Carousel";

import Services from "./services";
import Testimonials from "./testimonials";
import Contact from "./ContactUs";
import './home.css';
import Navbar from "../Navbar/Navbar";
import Mycards from "./Mycards";
import Footer from "../Footer/Footer";
import ContactUs from "./ContactUs";
export default function Home() {


  return (
    <div className="min-h-screen flex flex-col">
      
      <CarouselDarkVariant />
       <Navbar/>
      {/* <Mycards/> */}
      <Services />
      <Testimonials />
      <ContactUs />
      <Footer/>
    </div>
  );
}
