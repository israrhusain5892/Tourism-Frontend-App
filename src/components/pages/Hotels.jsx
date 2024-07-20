
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import HotelCarousel from './HotelCarousel';
import { FaSearch } from "react-icons/fa";
import apiUrl from '../../Axios';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';
import { getCurrentUserDetail,isLogin } from '../Auth';
// import { Spinner } from "@material-tailwind/react";
const Hotels = ({ setFavourites }) => {
    const [hotels, setHotels] = useState([]);
    const [allHotels, setAllHotels] = useState([]);
    const [states, setStates] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [selectedHotel, setSelectedHotel] = useState(null);

    const [login, setLogin] = useState(false);
  
    useEffect(() => {
     
      setLogin(isLogin());

    }, [login]);


    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        roomType: 'Standard',
        numberOfRooms: 1,
        totalPrice: 0,
    });
    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const hotelsResponse = await axios.get(`${apiUrl}/public/hotel/`);
                const statesResponse = await axios.get(`${apiUrl}/public/state/`);

                setAllHotels(hotelsResponse.data);
                setHotels(hotelsResponse.data.slice(0, itemsPerPage));
                setStates(statesResponse.data.map(state => ({ value: state.stateName, label: state.stateName })));

                const typesArray = [...new Set(hotelsResponse.data.map(hotel => hotel.type.trim().toLowerCase()))];
                setTypes(typesArray.map(type => ({ value: type, label: type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })));
                
                setPageCount(Math.ceil(hotelsResponse.data.length / itemsPerPage));
            } catch (error) {
                console.error("Error fetching data", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleStateChange = (selectedOption) => {
        const state = selectedOption ? selectedOption.value : '';
        setSelectedState(state);
        setCurrentPage(1);
        filterHotels(state, selectedType, 1, searchQuery);
    };

    const handleTypeClick = (type) => {
        const newType = type.value === selectedType ? '' : type.value;
        setSelectedType(newType);
        setCurrentPage(1);
        filterHotels(selectedState, newType, 1, searchQuery);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
        filterHotels(selectedState, selectedType, 1, query);
    };

    const filterHotels = (state, type, page, query) => {
        setLoading(true);
        let filtered = allHotels;

        if (state) {
            filtered = filtered.filter(hotel => hotel.state === state);
        }

        if (type) {
            filtered = filtered.filter(hotel => hotel.type.trim().toLowerCase() === type);
        }

        if (query) {
            filtered = filtered.filter(hotel =>
                hotel.name.toLowerCase().includes(query.toLowerCase()) ||
                hotel.address.toLowerCase().includes(query.toLowerCase()) ||
                hotel.city.toLowerCase().includes(query.toLowerCase()) ||
                hotel.state.toLowerCase().includes(query.toLowerCase()) ||
                hotel.type.trim().toLowerCase().includes(query.toLowerCase())
            );
        }

        const startIndex = (page - 1) * itemsPerPage;
        setTimeout(() => {
            setHotels(filtered.slice(startIndex, startIndex + itemsPerPage));
            setPageCount(Math.ceil(filtered.length / itemsPerPage));
            setLoading(false);
        }, 500);
    };

    const handlePageChange = ({ selected }) => {
        setLoading(true);
        const newPage = selected + 1;
        setCurrentPage(newPage);
        setTimeout(() => {
            filterHotels(selectedState, selectedType, newPage, searchQuery);
        }, 500);
    };

    const handleBookNow = (hotel) => {

        if(login){
            navigate('/Booknow', { state: { hotel } });
        }
        else{
            navigate("/login")
        }
       
    };


  

 ;

   

    const calculateTotalPrice = (roomType, numberOfRooms, price) => {
        let roomPrice = price;
        if (roomType === 'Executive') roomPrice = 1.5 * price;
        if (roomType === 'Deluxe') roomPrice = 2 * price;
        if (roomType === 'Executive Suite') roomPrice = 2.5 * price;
        return roomPrice * numberOfRooms;
    };

  

    const customStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#600180',
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
                borderColor: '#600180',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : '#600180',
            backgroundColor: state.isSelected ? '#600180' : 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#f0e4f7',
                color: 'black',
                boxShadow: '0 4px 6px -1px rgba(96, 1, 128, 0.5)',
                borderColor: '#600180',
                borderRadius: '20px',
                transform: 'scale(1.0)',
            },
        }),
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '8px',
            padding: '20px',
            border: 'none',
            backgroundColor: 'white',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1000',
        },
    };

    return (
        <div>
          {loading && <Loader/>}
        
            <Navbar />
            <HotelCarousel />
            <h2 className="text-5xl mt-8 font-bold text-center text-[#600180] mb-8">Our Exclusive Hotels</h2>
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
                        <div className="mb-4 ">
                            <Select
                                value={states.find(option => option.value === selectedState)}
                                onChange={handleStateChange}
                                options={states}
                                isClearable
                                placeholder="All States"
                                styles={customStyles}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {types.map(type => (
                                <button
                                    key={type.value}
                                    className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedType === type.value ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    onClick={() => handleTypeClick(type)}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="flex justify-end mb-6">
                            <FaSearch className='absolute text-lg mt-3 mr-3' />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search..."
                                className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {loading ? (
                                Array.from({ length: itemsPerPage }).map((_, index) => (
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
                            ) : (
                                hotels.map(hotel => (
                                    <div key={hotel.id} className="border p-4 rounded-md shadow-md flex flex-col h-full">
                                        <div className="h-48 w-full mb-4 rounded-md overflow-hidden">
                                            <div className="relative w-full h-full">
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                                                        <div className="w-20 h-20 border-8 text-[#600180] text-4xl animate-spin border-[#600180] border-opacity-50 flex items-center justify-center border-t-gray-300 rounded-full">
                                                            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
                                                                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img 
                                                    src={hotel.url || hotel.image || hotel.photo || `https://source.unsplash.com/300x200/?hotel,${hotel.name}`}
                                                    alt={hotel.name}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                                    onLoad={(e) => e.target.style.display = 'block'}
                                                    style={{ display: 'none' }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 truncate">{hotel.name}</h3>
                                        <p className="text-gray-500 mb-2">{hotel.address}</p>
                                        <p className="text-gray-600 mb-2"><strong>City:</strong> {hotel.city}</p>
                                        <p className="text-gray-600 mb-4"><strong>Standard Price:</strong> ₹{hotel.price}</p>
                                        <button
                                        onClick={() => handleBookNow(hotel)}
                                        className="mt-auto bg-[#600180] text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                    </div>
                                ))
                            )}
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
        

        </div>
    );
};

export default Hotels;
