import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
// import Loader from '../Loader';
import Admin from './Admin';
import apiUrl from '../../Axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

function BusViewPage() {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showPopup, setShowPopup] = useState({ show: false, message: '' });
  const [editBusData, setEditBusData] = useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/bus`);
      setBuses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setLoading(false);
    }
  };

  const deleteBus = async (busId) => {
    try {
      await axios.delete(`${apiUrl}/public/bus/${busId}`);
      setBuses(buses.filter((bus) => bus.id !== busId));
      showNotification('Bus deleted successfully.');
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const editBus = (bus) => {
    setEditBusData(bus);
  };

  const saveBus = async () => {
    try {
      if (editBusData.id) {
        await axios.put(`${apiUrl}/public/bus/${editBusData.id}`, editBusData);
        setBuses(
          buses.map((bus) => (bus.id === editBusData.id ? editBusData : bus))
        );
        showNotification('Bus updated successfully.');
      } else {
        const response = await axios.post(`${apiUrl}/public/bus`, editBusData);
        setBuses([...buses, response.data]);
        showNotification('Bus added successfully.');
      }
      setEditBusData(null);
    } catch (error) {
      console.error('Error saving bus:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBusData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditBusData((prevState) => ({
        ...prevState,
        imageUrl: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const search = () => {
    const filteredData = buses.filter(
      (bus) =>
        bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.busType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBuses(filteredData);
  };

  const refresh = () => {
    fetchBuses();
  };

  const handlePageChange = (direction) => {
    if (
      direction === 'next' &&
      currentPage < Math.ceil(buses.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, buses.length);
  const totalItems = buses.length;
  const paginatedBuses = buses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(buses.bus_number)


  const showNotification = (message) => {
    setShowPopup({ show: true, message });
    setTimeout(() => {
      setShowPopup({ show: false, message: '' });
    }, 3000);
  };

  return (
    <Admin>
      <div>
        <div className="mx-auto pt-20 pb-8 px-4">
          <h1 className="text-xl mx-auto text-center font-bold mb-0">All Buses</h1>
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
              Page {currentPage} of {Math.ceil(buses.length / itemsPerPage)}
            </span>
            <button
              className="text-gray rounded"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(buses.length / itemsPerPage)}
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
                      Bus Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Seats Available
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Routes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Photo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading && Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="8">
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
                  {paginatedBuses.map((bus, index) => (
                    <tr key={bus.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{bus.bus_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{bus.busType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{bus.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{bus.seatAvailable}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {bus.routes.map((route) => (
                          <div key={route.id}>
                            <span>{route.origin} - {route.destination} ({route.distance}km)</span>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={bus.imageUrl}
                          alt="Bus"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                          onClick={() => deleteBus(bus.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => editBus(bus)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {showPopup.show && (
            <div
              className="absolute top-20 right-0 p-4 bg-green-200 text-green-800 border border-green-300 rounded"
              style={{ zIndex: 1000 }}
            >
              {showPopup.message}
            </div>
          )}
        </div>

        {editBusData && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-1/2">
              <h2 className="text-xl mb-4">Edit Bus</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Bus Number:</label>
                <input
                  type="text"
                  name="bus_number"
                  value={editBusData.bus_number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <input
                  type="text"
                  name="busType"
                  value={editBusData.busType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Capacity:</label>
                <input
                  type="number"
                  name="capacity"
                  value={editBusData.capacity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Seats Available:</label>
                <input
                  type="number"
                  name="seatAvailable"
                  value={editBusData.seatAvailable}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image:</label>
                <input
                  type="file"
                  name="imageUrl"
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                />
                {editBusData.imageUrl && (
                  <img
                    src={editBusData.imageUrl}
                    alt="Bus"
                    className="h-32 w-32 mt-4"
                  />
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                  onClick={() => setEditBusData(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={saveBus}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Admin>
  );
}

export default BusViewPage;
