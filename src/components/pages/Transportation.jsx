import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaSearch, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../Axios';
import TransportCarousel from "./TransportCarousel";
import Navbar from "../Navbar/Navbar";
import Loader from '../Loader';
const TransportCards = () => {
    const [transports, setTransports] = useState([]);
    const [allTransports, setAllTransports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
    const [busTypes, setBusTypes] = useState([]);
    const [selectedBusType, setSelectedBusType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const busResponse = await axios.get(`${apiUrl}/public/bus`);
                setAllTransports(busResponse.data);
                setTransports(busResponse.data.slice(0, itemsPerPage));
                setPageCount(Math.ceil(busResponse.data.length / itemsPerPage));

                const originSet = new Set();
                const destinationSet = new Set();
                const busTypeSet = new Set();
                busResponse.data.forEach(transport => {
                    transport.routes.forEach(route => {
                        originSet.add(route.origin);
                        destinationSet.add(route.destination);
                    });
                    busTypeSet.add(transport.busType);
                });

                setOrigins(Array.from(originSet));
                setDestinations(Array.from(destinationSet));
                setBusTypes(Array.from(busTypeSet));
            } catch (error) {
                console.error("Error fetching data", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
        filterTransports(query, selectedOrigin, selectedDestination, selectedBusType, 1);
    };

    const handleOriginChange = (event) => {
        const origin = event.target.value;
        setSelectedOrigin(origin);
        setCurrentPage(1);
        filterTransports(searchQuery, origin, selectedDestination, selectedBusType, 1);
    };

    const handleDestinationChange = (event) => {
        const destination = event.target.value;
        setSelectedDestination(destination);
        setCurrentPage(1);
        filterTransports(searchQuery, selectedOrigin, destination, selectedBusType, 1);
    };

    const handleBusTypeChange = (event) => {
        const busType = event.target.value;
        setSelectedBusType(busType);
        setCurrentPage(1);
        filterTransports(searchQuery, selectedOrigin, selectedDestination, busType, 1);
    };

    const filterTransports = (query, origin, destination, busType, page) => {
        setLoading(true);
        let filtered = allTransports;

        if (query) {
            filtered = filtered.filter(transport =>
                transport.bus_number.toLowerCase().includes(query.toLowerCase()) ||
                transport.busType.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (origin) {
            filtered = filtered.filter(transport =>
                transport.routes.some(route => route.origin.toLowerCase().includes(origin.toLowerCase()))
            );
        }

        if (destination) {
            filtered = filtered.filter(transport =>
                transport.routes.some(route => route.destination.toLowerCase().includes(destination.toLowerCase()))
            );
        }

        if (busType) {
            filtered = filtered.filter(transport =>
                transport.busType.toLowerCase() === busType.toLowerCase()
            );
        }

        const startIndex = (page - 1) * itemsPerPage;
        setTimeout(() => {
            setTransports(filtered.slice(startIndex, startIndex + itemsPerPage));
            setPageCount(Math.ceil(filtered.length / itemsPerPage));
            setLoading(false);
        }, 500);
    };

    const handlePageChange = ({ selected }) => {
        setLoading(true);
        const newPage = selected + 1;
        setCurrentPage(newPage);
        setTimeout(() => {
            filterTransports(searchQuery, selectedOrigin, selectedDestination, selectedBusType, newPage);
        }, 500);
    };

    const handleBookNow = (transport) => {
        setSelectedTransport(transport);
        setModalIsOpen(true);
    };

    const handleOriginSelect = (event) => {
        setSelectedOrigin(event.target.value);
    };

    const handleOriginSubmit = (event) => {
        event.preventDefault();
        setModalIsOpen(false);
        setDetailsModalIsOpen(true);
    };

    const closeDetailsModal = () => {
        setDetailsModalIsOpen(false);
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
        <>
            <Navbar />
            {loading && <Loader/>}
            <TransportCarousel />
            <div className="p-4 bg-gray-100 min-h-screen">
                <h2 className="text-5xl mt-8 font-bold text-center text-[#600180] mb-8">Available Transport</h2>
                <div className="flex">
                    <div className="w-1/4 pr-4">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <select
                                    value={selectedOrigin}
                                    onChange={handleOriginChange}
                                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300 flex-1"
                                >
                                    <option value="">From</option>
                                    {origins.map((origin, index) => (
                                        <option key={index} value={origin}>{origin}</option>
                                    ))}
                                </select>
                                <span className="text-[#600180] text-2xl">⟹</span>

                                <select
                                    value={selectedDestination}
                                    onChange={handleDestinationChange}
                                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300 flex-1"
                                >
                                    <option value="">To</option>
                                    {destinations.map((destination, index) => (
                                        <option key={index} value={destination}>{destination}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {busTypes.map((busType, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleBusTypeChange({ target: { value: busType } })}
                                        className={`px-4 py-2 rounded-lg focus:outline-none ${
                                            selectedBusType === busType
                                                ? 'bg-[#600180] text-white'
                                                : 'bg-gray-200 hover:bg-gray-300 text-[#600180]'
                                        }`}
                                    >
                                        {busType}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="flex justify-end mb-6">
                            <div className="relative w-full max-w-md">
                                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                transports.map((transport) => (
                                    <div key={transport.id} className="border p-4 rounded-md shadow-md flex flex-col h-full">
                                        <div className="h-48 w-full mb-4 rounded-md overflow-hidden">
                                            <img 
                                                src={transport.imageUrl || 'https://via.placeholder.com/300'}
                                                alt={transport.bus_number}
                                                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 truncate">Bus Number: {transport.bus_number}</h3>
                                        <p className="text-gray-600 mb-2"><strong>Type:</strong> {transport.busType}</p>
                                        <p className="text-gray-600 mb-2"><strong>Capacity:</strong> {transport.capacity}</p>
                                        
                                        {transport.routes.slice(0, 1).map(route => (
                                            <div key={route.id}>
                                                <p className="text-gray-600 mb-2"><strong>Destination:</strong> {route.destination}</p>
                                            </div>
                                        ))}
                                        <button
                                            className="mt-auto px-4 py-2 bg-[#600180] text-white rounded-md transition-colors duration-200 hover:bg-[#A040A0]"
                                            onClick={() => handleBookNow(transport)}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
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
                        breakLinkClassName="page-link px-4 border rounded-md hover:bg-gray-400"
                        activeClassName="active"
                        activeLinkClassName="active-page bg-[#600180] text-white rounded-md"
                    />
                </div>
            </div>
        </>
    );
};

export default TransportCards;