import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Select from "react-select";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Typewriter } from "react-simple-typewriter"; // Import typewriter
import { FaSearch } from "react-icons/fa";
import Footer from "../Footer/Footer";
import apiUrl from "../../Axios";
import Loader from "../Loader";
const Packages = ({ setFavourites }) => {
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [favourites, setLocalFavourites] = useState([]); // Local state for favourites
  const [showAll, setShowAll] = useState(false); // State for showing all trips
  const itemsPerPage = 8; // 2 rows with 4 items each
  const [pageCount, setPageCount] = useState(0);
  const[loading,setLoading]=useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tripsResponse = await axios.get(`${apiUrl}/public/trip/`);
        const statesResponse = await axios.get(`${apiUrl}/public/state/`);
        const categoriesResponse = await axios.get(
          `${apiUrl}/public/tripCategory/`
        );

        setAllTrips(tripsResponse.data); // Store all trips for filtering
        setTrips(tripsResponse.data.slice(0, itemsPerPage)); // Load only initial trips
        setPageCount(Math.ceil(tripsResponse.data.length / itemsPerPage));
        setStates(
          statesResponse.data.map((state) => ({
            value: state.stateName,
            label: state.stateName,
          }))
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    const loadFavourites = () => {
      const savedFavourites = localStorage.getItem("favourites");
      if (savedFavourites) {
        setLocalFavourites(JSON.parse(savedFavourites));
      }
    };

    fetchData();
    loadFavourites();
  }, []);

  const handleStateChange = (selectedOption) => {
    const state = selectedOption ? selectedOption.value : '';
    setSelectedState(state);
    setCurrentPage(1); // Reset to first page
    filterTrips(state, selectedCategory, 1, searchQuery);
  };

  const handleCategoryClick = (category) => {
    const newCategory =
      category.categoryName === selectedCategory ? "" : category.categoryName;
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to first page
    filterTrips(selectedState, newCategory, 1, searchQuery);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // setCurrentPage(1); // Reset to first page
    filterTrips(selectedState, selectedCategory, 1, query);
  };

  const filterTrips = (state, category, page, query) => {
    setLoading(true);
    let filtered = allTrips;

    if (!showAll) {
      if (state) {
        filtered = filtered.filter((trip) => trip.stateName === state);
      }

      if (category) {
        filtered = filtered.filter((trip) => trip.categoryName === category);
      }
    }

    if (query) {
      filtered = filtered.filter(
        (trip) =>
          trip.tripName.toLowerCase().includes(query.toLowerCase()) ||
          trip.tripAddress.toLowerCase().includes(query.toLowerCase()) ||
          trip.stateName.toLowerCase().includes(query.toLowerCase()) ||
          trip.categoryName.toLowerCase().includes(query.toLowerCase())
      );
    }

    const startIndex = (page - 1) * itemsPerPage;
    setTimeout(() => {
      setTrips(filtered.slice(startIndex, startIndex + itemsPerPage));
      setPageCount(Math.ceil(filtered.length / itemsPerPage));
      setLoading(false);
    }, 500); // Simulate loading time
  };

  const handlePageChange = ({ selected }) => {
    filterTrips(selectedState, selectedCategory, selected, searchQuery);
  };

  const handleAddToFavourites = (trip) => {
    setLocalFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.some(
        (fav) => fav.tripId === trip.tripId
      )
        ? prevFavourites.filter((fav) => fav.tripId !== trip.tripId)
        : [...prevFavourites, trip];
      setFavourites(updatedFavourites); // Update the favourites in parent component
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Save to local storage
      return updatedFavourites;
    });
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#600180",
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#600180",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "#600180",
      backgroundColor: state.isSelected ? "#600180" : "white",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f0e4f7",
        boxShadow: "0 4px 6px -1px rgba(96, 1, 128, 0.5)",
        borderColor: "#600180",
        borderRadius: "20px",
        transform: "scale(1.1)",
      },
    }),
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedState("");
    setSelectedCategory("");
    setCurrentPage(1);
    filterTrips("", "", 1, searchQuery);
  };

  return (
    <>
      <Navbar />
      {loading && <Loader/>}
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        showStatus={false}
        className="mt-20"
      >
        <div className="relative h-[70vh]">
          <img
            src="https://wallpaperaccess.com/full/407993.jpg"
            alt="Slide 1"
            className=" inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <h3 className="text-3xl text-white">
              <Typewriter
                words={[
                  "Discover Amazing Places",
                  "Explore the Unseen",
                  "Adventure Awaits",
                  "Book Your Dream Trip",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h3>
          </div>
        </div>
        <div className="relative h-[70vh]">
          <img
            src="https://wallpaperaccess.com/full/407996.jpg"
            alt="Slide 2"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <h3 className="text-3xl text-white">
              <Typewriter
                words={[
                  "Experience the Beauty",
                  "Travel with Comfort",
                  "Create Lasting Memories",
                  "Find Your Perfect Package",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h3>
          </div>
        </div>
        <div className="relative h-[70vh]">
          <img
            src="https://wallpaperaccess.com/full/7993364.jpg"
            alt="Slide 3"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <h3 className="text-3xl text-white">
              <Typewriter
                words={[
                  "Unforgettable Journeys",
                  "Exciting Destinations",
                  "Plan Your Getaway",
                  "Adventure of a Lifetime",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h3>
          </div>
        </div>
        <div className="relative h-[70vh]">
          <img
            src="https://wallpaperaccess.com/full/2098379.jpg"
            alt="Slide 4"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <h3 className="text-3xl text-white">
              <Typewriter
                words={[
                  "Travel Far and Wide",
                  "Discover Hidden Gems",
                  "Your Next Adventure",
                  "See the World",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h3>
          </div>
        </div>
      </Carousel>
      <h2 className="text-5xl mt-8 font-bold text-center text-[#600180] mb-8">
        Our Exclusive Tour Packages
      </h2>
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
            <div className="mb-4">
              <Select
                value={states.find(option => option.value === selectedState)}
                onChange={handleStateChange}
                options={states}
                isClearable
                placeholder="All States"
                styles={customStyles}
              />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className={`${selectedCategory === ""
                  ? "bg-[#600180] text-white"
                  : "bg-white text-[#600180] border border-[#600180]"
                  } py-2 px-4 rounded-3xl focus:outline-none hover:bg-[#600180] hover:text-white transition duration-300`}
                onClick={handleShowAll}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.categoryId}
                  className={`${selectedCategory === category.categoryName
                    ? "bg-[#600180] text-white"
                    : "bg-white text-[#600180] border border-[#600180]"
                    } py-2 px-4 rounded-3xl focus:outline-none hover:bg-[#600180] hover:text-white transition duration-300`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.categoryName}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex justify-end mb-6 relative">
              <FaSearch className="absolute text-lg mt-3 mr-3 right-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300 pr-10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-neutral-300 w-full h-64 animate-pulse rounded-xl p-4 gap-4"
                  >
                    <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-[#600180] bg-opacity-50 w-full h-4 animate-pulse rounded-md"></div>
                      <div className="bg-[#600180] bg-opacity-50 w-4/5 h-4 animate-pulse rounded-md"></div>
                      <div className="bg-[#600180] bg-opacity-50 w-full h-4 animate-pulse rounded-md"></div>
                      <div className="bg-[#600180] bg-opacity-50 w-2/4 h-4 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                ))
                : trips.map((trip) => (
                  <div
                    key={trip.tripId}
                    className="border p-4 rounded-md shadow-md flex flex-col h-full"
                  >
                    <div className="h-48 w-full mb-4 rounded-md overflow-hidden">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <div className="flex-col gap-4 w-full flex items-center justify-center">
                            <div className="w-20 h-20 border-8 text-[#600180] text-4xl animate-spin border-[#600180] border-opacity-50 flex items-center justify-center border-t-gray-300 rounded-full">
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className="animate-ping"
                              >
                                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <img
                          src={
                            trip.url ||
                            `https://source.unsplash.com/300x200/?travel,${trip.tripName}`
                          }
                          alt={trip.tripName}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                          onLoad={(e) => (e.target.style.display = "block")}
                          style={{ display: "none" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=No+Image";
                          }}
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 truncate">
                      {trip.tripName}
                    </h3>
                    <p className="text-gray-500 mb-2">{trip.tripAddress}</p>
                    
                    <p className="text-gray-600 mb-4">
                      <strong>Price:</strong> ₹{trip.tripPrice}
                    </p>
                    <button
                      onClick={() => handleAddToFavourites(trip)}
                      className={`mt-auto px-4 py-2 rounded-md transition-colors duration-200 ${favourites.some((fav) => fav.tripId === trip.tripId)
                        ? "bg-[#600180] text-white"
                        : "bg-gray-200 text-[#600180] hover:bg-gray-300"
                        }`}
                    >
                      {favourites.some((fav) => fav.tripId === trip.tripId)
                        ? "Added to Wish List"
                        : "Add to Wish List"}
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
              <ReactPaginate
                previousLabel={<FaArrowAltCircleLeft />}
                nextLabel={<FaArrowAltCircleRight />}
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination flex items-center space-x-2"
                pageClassName="page-item"
                pageLinkClassName="page-link px-3 py-0 rounded-md cursor-pointer hover:bg-gray-400 hover:rounded-md"
                previousClassName="page-item"
                previousLinkClassName="page-link mt-3 text-lg rounded-md hover:bg-gray-300"
                nextClassName="page-item"
                nextLinkClassName="page-link mt-3 text-lg rounded-md hover:bg-gray-300"
                breakClassName="page-item"
                breakLinkClassName="page-link px-4 border rounded-md cursor-pointer hover:bg-gray-300"
                activeClassName="active rounded-md bg-[#600180] text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Packages;
