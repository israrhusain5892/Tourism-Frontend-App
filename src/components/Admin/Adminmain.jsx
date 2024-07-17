import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import apiUrl from '../../Axios';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from 'chart.js';
import Admin from './Admin';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
);

const Adminmain = () => {
    const [tripCounts, setTripCounts] = useState({ labels: [], data: [] });
    const [selectedState, setSelectedState] = useState('');
    const [touristData, setTouristData] = useState({ labels: [], datasets: [] });
    const [hotelCounts, setHotelCounts] = useState({});
    const [selectedHotelState, setSelectedHotelState] = useState('');
    const [hotelBookingData, setHotelBookingData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState('');

    const Loader = () => (
        <div className="flex justify-center items-center h-full">
            <div
                className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-spin z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-spin before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-spin after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
            >
                <span
                    className="absolute w-[85%] aspect-square rounded-full z-[60] animate-spin bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
                ></span>
            </div>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripsResponse = await axios.get(`${apiUrl}/public/trip/`);
                const statesResponse = await axios.get(`${apiUrl}/public/state/`);
                const hotelsResponse = await axios.get(`${apiUrl}/public/hotel/`);

                const trips = tripsResponse.data;
                const states = statesResponse.data;
                const hotels = hotelsResponse.data;

                const tripCountByState = trips.reduce((acc, trip) => {
                    const state = trip.stateName;
                    if (acc[state]) {
                        acc[state] += 1;
                    } else {
                        acc[state] = 1;
                    }
                    return acc;
                }, {});

                const hotelCountByState = hotels.reduce((acc, hotel) => {
                    const state = hotel.state;
                    if (acc[state]) {
                        acc[state] += 1;
                    } else {
                        acc[state] = 1;
                    }
                    return acc;
                }, {});

                const labels = states.map(state => state.stateName);
                const data = labels.map(label => tripCountByState[label] || 0);

                setTripCounts({ labels, data });
                setHotelCounts(hotelCountByState);
                setSelectedState(labels[0] || '');
                setSelectedHotelState(labels[0] || '');
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedState) {
            const dummyTouristData = {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                datasets: [
                    {
                        label: `Tourists in ${selectedState}`,
                        data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 5000) + 1000),
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.4)',
                    }
                ]
            };
            setTouristData(dummyTouristData);
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedHotelState) {
            const dummyHotelBookingData = {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                datasets: [
                    {
                        label: '3 Star Hotels',
                        data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 20),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: '4 Star Hotels',
                        data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 20),
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: '5 Star Hotels',
                        data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 20),
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                    },
                ]
            };
            setHotelBookingData(dummyHotelBookingData);
        }
    }, [selectedHotelState]);

    const doughnutData = {
        labels: tripCounts.labels,
        datasets: [
            {
                label: 'Number of Trips',
                data: tripCounts.data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FFCD56',
                    '#36A2EB',
                    '#FF6384',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FFCD56',
                    '#36A2EB',
                    '#FF6384',
                ],
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                align: 'center',
                labels: {
                    color: 'white', // Set label color to white
                    font: {
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                color: 'white', // Set title color to white
            },
        },
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Number of Tourists Visited by Year',
                color: 'white', // Set title color to white
            },
            legend: {
                labels: {
                    color: 'white', // Set legend label color to white
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white', // Set x-axis label color to white
                    callback: function (val, index) {
                        return index % 2 === 0 ? this.getLabelForValue(val) : '';
                    },
                },
            },
            y: {
                ticks: {
                    color: 'white', // Set y-axis label color to white
                },
            },
        },
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Hotel Bookings by Year',
                color: 'white', // Set title color to white
            },
            legend: {
                labels: {
                    color: 'white', // Set legend label color to white
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'white', // Set x-axis label color to white
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'white', // Set y-axis label color to white
                },
            },
        },
    };

    const handleDivClick = (data, type) => {
        setModalData(data);
        setModalType(type);
    };

    const handleCloseModal = () => {
        setModalData(null);
        setModalType('');
    };

    const userData = [
        { name: "Shailesh Gaikwad", trip: "Mumbai", paymentForTrip: "Done", hotel: "Taj Hotel", paymentForHotel: "Done" },
        { name: "Shailesh Gaikwad", trip: "Mumbai", paymentForTrip: "Done", hotel: "Taj Hotel", paymentForHotel: "Done" },
        { name: "Anjali Sharma", trip: "Delhi", paymentForTrip: "Pending", hotel: "Oberoi Hotel", paymentForHotel: "Done" },
        { name: "Rohan Verma", trip: "Bangalore", paymentForTrip: "Done", hotel: "ITC Gardenia", paymentForHotel: "Pending" },
        { name: "Amit Patel", trip: "Chennai", paymentForTrip: "Pending", hotel: "Hyatt Regency", paymentForHotel: "Done" },
        
        { name: "Amit Patel", trip: "Chennai", paymentForTrip: "Pending", hotel: "Hyatt Regency", paymentForHotel: "Done" },
        { name: "Amit Patel", trip: "Chennai", paymentForTrip: "Pending", hotel: "Hyatt Regency", paymentForHotel: "Done" },
        
        { name: "Amit Patel", trip: "Chennai", paymentForTrip: "Pending", hotel: "Hyatt Regency", paymentForHotel: "Done" },
        { name: "Shailesh Gaikwad", trip: "Mumbai", paymentForTrip: "Done", hotel: "Taj Hotel", paymentForHotel: "Done" },
        { name: "Anjali Sharma", trip: "Delhi", paymentForTrip: "Pending", hotel: "Oberoi Hotel", paymentForHotel: "Done" },
        { name: "Rohan Verma", trip: "Bangalore", paymentForTrip: "Done", hotel: "ITC Gardenia", paymentForHotel: "Pending" },
        { name: "Neha Singh", trip: "Goa", paymentForTrip: "Done", hotel: "Leela Palace", paymentForHotel: "Done" },
        { name: "Shailesh Gaikwad", trip: "Mumbai", paymentForTrip: "Done", hotel: "Taj Hotel", paymentForHotel: "Done" },
        { name: "Anjali Sharma", trip: "Delhi", paymentForTrip: "Pending", hotel: "Oberoi Hotel", paymentForHotel: "Done" },
        { name: "Rohan Verma", trip: "Bangalore", paymentForTrip: "Done", hotel: "ITC Gardenia", paymentForHotel: "Pending" },
        { name: "Neha Singh", trip: "Goa", paymentForTrip: "Done", hotel: "Leela Palace", paymentForHotel: "Done" },
        { name: "Neha Singh", trip: "Goa", paymentForTrip: "Done", hotel: "Leela Palace", paymentForHotel: "Done" },
        { name: "Amit Patel", trip: "Chennai", paymentForTrip: "Pending", hotel: "Hyatt Regency", paymentForHotel: "Done" },
    ];

    const renderPaymentStatus = (status) => {
        return status === "Done" ? "✔️" : "❌";
    };


    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;
    const totalPages = Math.ceil(userData.length / entriesPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * entriesPerPage + 1;
    const endIndex = Math.min(currentPage * entriesPerPage, userData.length);
    const currentEntries = userData.slice(startIndex - 1, endIndex);
    return (
        <Admin>
    <div className="container mx-auto pt-12 p-4 bg-[#102C57] text-white">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-16">
            <div
                className="bg-[#1E0342] p-6 rounded-lg shadow-custom-red border-double border-4 border-[#FFCBCB] transition-transform transform hover:scale-105 cursor-pointer flex flex-col h-full"
                onClick={() => handleDivClick(doughnutData, 'doughnut')}>
                <div className="flex-grow flex flex-col items-center justify-start">
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mt-4 text-center">Number of Trips (Statewise)</h1>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </>
                    )}
                </div>
            </div>

            <div
                className="bg-[#1E0342] p-6 rounded-lg shadow-custom-red border-double border-4 border-[#FFCBCB] transition-transform transform hover:scale-105 cursor-pointer flex flex-col h-full"
            >
                <div className="flex flex-col mb-4">
                    <label htmlFor="stateSelect" className="text-lg font-semibold">Select State</label>
                    <select
                        id="stateSelect"
                        className="mt-2 p-2 border rounded bg-[#102C57] text-white"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        {tripCounts.labels.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    {loading ? (
                        <Loader />
                    ) : (
                        <Line
                            onClick={() => handleDivClick(touristData, 'line')}
                            data={touristData} options={lineChartOptions} />
                    )}
                </div>
            </div>

            <div
                className="bg-[#1E0342] p-6 rounded-lg shadow-custom-red border-double border-4 border-[#FFCBCB] transition-transform transform hover:scale-105 cursor-pointer flex flex-col h-full"
            >
                <div className="flex flex-col mb-4">
                    <label htmlFor="hotelStateSelect" className="text-lg font-semibold">Select State</label>
                    <select
                        id="hotelStateSelect"
                        className="mt-2 p-2 border rounded bg-[#102C57] text-white"
                        value={selectedHotelState}
                        onChange={(e) => setSelectedHotelState(e.target.value)}
                    >
                        {tripCounts.labels.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col justify-center mb-4">
                    <p className="text-lg font-semibold mb-2">Number of Hotels in {selectedHotelState}</p>
                    <p className="text-3xl font-bold">{hotelCounts[selectedHotelState] || 0}</p>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    {loading ? (
                        <Loader />
                    ) : (
                        <Bar
                            onClick={() => handleDivClick(hotelBookingData, 'bar')}
                            data={hotelBookingData} options={barChartOptions} />
                    )}
                </div>
            </div>

            <div className="bg-[#1E0342] p-6 rounded-lg shadow-custom-red border-double border-4 border-[#FFCBCB] transition-transform transform hover:scale-105 cursor-pointer flex flex-col h-full">
                <h1 className="text-2xl font-bold mt-4 mb-4 text-center">User Booking Details</h1>
                <div className="flex justify-between mb-4 text-white">
                    <span>Total Entries: {userData.length}</span>
                    <span>Total Pages: {totalPages}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#102C57] text-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">User</th>
                                <th className="py-2 px-4 border">Trip</th>
                                <th className="py-2 px-4 border">Payment for Trip</th>
                                <th className="py-2 px-4 border">Hotel</th>
                                <th className="py-2 px-4 border">Payment for Hotel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((user, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.trip}</td>
                                    <td className="py-2 px-4 border">{renderPaymentStatus(user.paymentForTrip)}</td>
                                    <td className="py-2 px-4 border">{user.hotel}</td>
                                    <td className="py-2 px-4 border">{renderPaymentStatus(user.paymentForHotel)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-300">
                        Showing {startIndex} to {endIndex} of {userData.length} entries
                    </span>
                    <div className="flex items-center">
                        <button
                            className="text-gray-300 rounded mx-2"
                            onClick={() => handlePageChange('prev')}
                            disabled={currentPage === 1}
                        >
                            <FaArrowLeft size={20} color={currentPage === 1 ? "#ccc" : "#fff"} />
                        </button>
                        <span className="text-gray-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="text-gray-300 rounded mx-2"
                            onClick={() => handlePageChange('next')}
                            disabled={currentPage === totalPages}
                        >
                            <FaArrowRight size={20} color={currentPage === totalPages ? "#ccc" : "#fff"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {modalData && (
        <div className="pt-8 z-[9999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-[#102C57] p-4 rounded-lg max-w-3xl w-full">
                <button onClick={handleCloseModal} className="text-white font-bold">
                    <AiOutlineCloseCircle className="inline-block align-middle" size={24} /> {/* Icon */}
                </button>
                {modalType === 'doughnut' && <Doughnut data={modalData} />}
                {modalType === 'line' && <Line data={modalData} />}
                {modalType === 'bar' && <Bar data={modalData} />}
            </div>
        </div>
    )}
</Admin>


    );
};

export default Adminmain;
