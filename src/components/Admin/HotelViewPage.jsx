import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiArrowLeftSLine, RiArrowRightSLine, RiDeleteBin2Fill } from 'react-icons/ri';
import { FaTrash, FaEdit } from 'react-icons/fa'
// import Loader from '../Loader';
import Admin from './Admin';
import apiUrl from '../../Axios';
import Swal from 'sweetalert2';

function HotelViewPage() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [editingHotelStateCities, setEditingHotelStateCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showPopup, setShowPopup] = useState({ show: false, message: '' });

  useEffect(() => {
    fetchHotels();
    fetchStates();
    fetchCities();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/hotel/`);
      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/state/`);
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/city/`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const deleteHotel = async (hotelId) => {
    try {
      await axios.delete(`${apiUrl}/public/hotel/${hotelId}`);
      // showNotification('Hotel deleted successfully.');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
      }).then((result) => {
        if (result.isConfirmed) {
          setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
          Swal.fire('Deleted','Hotel is Deleted','success')
        }
      });
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const editHotel = (hotel) => {
    setEditingHotel(hotel);
    const stateCities = cities.filter((city) => city.stateName === hotel.state);
    setEditingHotelStateCities(stateCities);
  };

  const saveHotel = async () => {
    try {
      const formData = new FormData();
      Object.entries(editingHotel).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.put(
        `${apiUrl}/public/hotel/${editingHotel.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        setHotels(hotels.map((hotel) => (hotel.id === editingHotel.id ? editingHotel : hotel)));
        setEditingHotel(null);
        showNotification('Hotel updated successfully.');
      } else {
        console.error('Error updating hotel:', response);
        showNotification('Failed to update hotel.');
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
      showNotification('Error saving hotel. Please try again.');
    }
  };

  const search = () => {
    const filteredData = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setHotels(filteredData);
  };

  const refresh = () => {
    fetchHotels();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingHotel({ ...editingHotel, [name]: value });

    if (name === 'state') {
      const stateCities = cities.filter((city) => city.stateName === value);
      setEditingHotelStateCities(stateCities);
      setEditingHotel({ ...editingHotel, city: stateCities.length ? stateCities[0].cityName : '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditingHotel({ ...editingHotel, file });
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(hotels.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, hotels.length);
  const totalItems = hotels.length;
  const paginatedHotels = hotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const showNotification = (message) => {
    setShowPopup({ show: true, message });
    setTimeout(() => {
      setShowPopup({ show: false, message: '' });
    }, 3000);
  };

  return (
    <Admin>
      <div >
        <div className="mx-auto pt-20 pb-8 px-4">
          <h1 className="text-xl  mx-auto text-center font-bold mb-0">All Hotels</h1>
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
              Page {currentPage} of {Math.ceil(hotels.length / itemsPerPage)}
            </span>
            <button
              className="text-gray rounded"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(hotels.length / itemsPerPage)}
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
                      Name
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
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
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
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="10">
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
                  {paginatedHotels.map((element, index) => (
                    <tr key={element.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.type}</td>
                      <td className="px-6 py-4">{element.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={element.url}
                          alt={element.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                          onClick={() => deleteHotel(element.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="px-2 ml-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => editHotel(element)}
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
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <RiArrowLeftSLine className="inline-block mr-1" />
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {Math.ceil(hotels.length / itemsPerPage)}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(hotels.length / itemsPerPage)}
            >
              <RiArrowRightSLine className="inline-block ml-1" />
            </button>
          </div>
        </div>
        {editingHotel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Hotel</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingHotel.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editingHotel.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editingHotel.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  name="state"
                  value={editingHotel.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.stateId} value={state.stateName}>
                      {state.stateName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                  name="city"
                  value={editingHotel.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select City</option>
                  {editingHotelStateCities.map((city) => (
                    <option key={city.cityId} value={city.cityName}>
                      {city.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={editingHotel.rating}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editingHotel.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={saveHotel}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingHotel(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopup.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <p>{showPopup.message}</p>
            </div>
          </div>
        )}
      </div>
    </Admin>
  );
}

export default HotelViewPage;
