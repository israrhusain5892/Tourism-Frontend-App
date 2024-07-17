import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Loader from '../Loader';
import Admin from './Admin';
import apiUrl from '../../Axios';

function BusBookingViewPage() {
  const [busBookings, setBusBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchBusBookings();
  }, []);

  const fetchBusBookings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/busBooking`);
      setBusBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bus bookings:', error);
      setLoading(false);
    }
  };

  const search = () => {
    const filteredData = busBookings.filter((booking) =>
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bus.routes.some(route =>
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setBusBookings(filteredData);
  };

  const refresh = () => {
    fetchBusBookings();
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(busBookings.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, busBookings.length);
  const totalItems = busBookings.length;
  const paginatedBusBookings = busBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Admin>
      <div >
        <div className="mx-auto pt-20 pb-8 px-4">
          <h1 className="text-xl mx-auto text-center font-bold mb-0">All Bus Bookings</h1>
          <div
            className="min-w-full mt-[-10px]"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <button className="bg-blue-500 px-2 py-1 text-white" onClick={refresh}>
                Refresh
              </button>
            </div>
            <div>
              <input
                className="px-5 py-1 border"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={search} className="bg-blue-400 px-2 py-1 text-white">
                Search
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <span className="px-4 py-2 text-gray-600">
              Showing {startIndex} to {endIndex} of {totalItems} records
            </span>
            <button
              className="text-gray rounded"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <RiArrowLeftSLine className="inline-block mr-1" />
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {Math.ceil(busBookings.length / itemsPerPage)}
            </span>
            <button
              className="text-gray rounded"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(busBookings.length / itemsPerPage)}
            >
              <RiArrowRightSLine className="inline-block ml-1" />
            </button>
          </div>
          <div className="overflow-hidden bg-white h-[700px] rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bus Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Origin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Destination
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Seats Confirmed
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading && Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="7">
                        <div className="relative flex w-full animate-pulse gap-2 p-4">
                          <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                          <div className="flex-1">
                            <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                            <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-base"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedBusBookings.map((booking, index) => (
                    <tr key={booking.busBookingId}>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.busBookingId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.bus.bus_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.bus.routes.map((route) => (
                          <div key={route.id}>{route.origin}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.bus.routes.map((route) => (
                          <div key={route.id}>{route.destination}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.seatNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.bookingPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <RiArrowLeftSLine className="inline-block mr-1" />
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {Math.ceil(busBookings.length / itemsPerPage)}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(busBookings.length / itemsPerPage)}
            >
              <RiArrowRightSLine className="inline-block ml-1" />
            </button>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default BusBookingViewPage;