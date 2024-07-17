import React, {useEffect} from 'react'
import './Carousel.css'

// Imported Assests
import Video from '../../components/assets/mainBg.mp4'
import image1 from "../../components/assets/image1.webp"
import image2 from "../../components/assets/image2.webp"
import image3 from "../../components/assets/image3.webp"
import image4 from "../../components/assets/image4.webp"
import { AiOutlineSwapRight } from "react-icons/ai";

import Aos from 'aos'
import 'aos/dist/aos.css'

const Carousel = () => {

  useEffect(() => {
    Aos.init({duration: 1000})
  },[])

  return (
    <div className='Carousel-Home'>
      <div className="Carousel-videoBg">
        <video className='carousel-video-tag' src={Video} autoPlay loop muted></video>
      </div>

      <div className="Carousel-sectionText">
        <h1 className='carousel-h1' data-aos='fade-up'>Incredible <span id='orange'>In</span><span id='blue'>d</span><span id='green'>ia</span>!</h1>
        <p className='carousel-para' data-aos='fade-up'>Discover the India's most adventurous nature, life is short for a trip.</p>
        <a href="#destination"><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
GET STARTED
</span>
</button></a>
      </div>

      <div className="popularPlaces">
        <div className="carousel-content">
          <h3 data-aos='fade-up'>Popular Places</h3>
          <div className="slider">
            <div className="carousel-images flex slide-track" data-aos ='fade-up'>
              <div className="carousel-slide">
                <img className='carousel-slide-img' src={image1} alt="PopularPlace1" />
              </div>
              <div className="carousel-slide">
                <img className='carousel-slide-img' src={image2} alt="PopularPlace1" />
              </div>
              <div className="carousel-slide">
                <img className='carousel-slide-img' src={image3} alt="PopularPlace1" />
              </div>
              <div className="carousel-slide">
                <img className='carousel-slide-img' src={image4} alt="PopularPlace1" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Carousel