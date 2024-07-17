import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Loader from '../Loader';
import apiUrl from '../../Axios';

import Admin from './Admin';

function TripViewPage() {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [editingTripStateCities, setEditingTripStateCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchTrips();
    fetchStates();
    fetchCities();
    fetchCategories();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/trip/`);
      setTrips(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trips:', error);
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/tripCategory/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const confirmDeleteTrip = (tripId) => {
    setTripToDelete(tripId);
    setShowDeletePopup(true);
  };

  const deleteTrip = async (tripId) => {
    try {
      await axios.delete(`${apiUrl}/public/trip/${tripId}`);
      setTrips(trips.filter((trip) => trip.tripId !== tripId));
      showNotification('Trip deleted successfully.');
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const editTrip = (trip) => {
    setEditingTrip(trip);
    const stateCities = cities.filter((city) => city.stateName === trip.stateName);
    setEditingTripStateCities(stateCities);
  };

  const saveTrip = async () => {
    try {
      const formData = new FormData();
      Object.entries(editingTrip).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.put(`${apiUrl}/public/trip/${editingTrip.tripId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTrips(trips.map((trip) => (trip.tripId === editingTrip.tripId ? editingTrip : trip)));
      setEditingTrip(null);
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  const search = () => {
    const filteredData = trips.filter((trip) =>
      trip.tripName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTrips(filteredData);
  };

  const refresh = () => {
    fetchTrips();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTrip({ ...editingTrip, [name]: value });

    if (name === 'stateName') {
      const stateCities = cities.filter((city) => city.stateName === value);
      setEditingTripStateCities(stateCities);
      setEditingTrip({ ...editingTrip, cityName: stateCities.length ? stateCities[0].cityName : '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditingTrip({ ...editingTrip, file });
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(trips.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, trips.length);
  const totalItems = trips.length;
  const paginatedTrips = trips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Admin>
      <div>
        <div className="mx-auto pt-20 pb-8 px-4">
          <h1 className="text-xl mx-auto text-center font-bold mb-0">All Trips</h1>
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
              Page {currentPage} of {Math.ceil(trips.length / itemsPerPage)}
            </span>
            <button
              className="text-gray rounded"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(trips.length / itemsPerPage)}
            >
              <RiArrowRightSLine className="inline-block ml-1" />
            </button>
          </div>

          <div className="overflow-hidden bg-white h-[535px] rounded-lg shadow">
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
                    Trip Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trip Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trip Photo
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
                    City
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
                {loading ? (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan="7">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  paginatedTrips.map((element, index) => (
                    <tr key={element.tripId}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.tripName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.tripPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={element.url}
                          alt={element.tripName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.stateName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{element.cityName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                          onClick={() => confirmDeleteTrip(element.tripId)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-2 ml-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => editTrip(element)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="min-w-full mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <RiArrowLeftSLine className="inline-block mr-1" />
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {Math.ceil(trips.length / itemsPerPage)}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === Math.ceil(trips.length / itemsPerPage)}
            >
              <RiArrowRightSLine className="inline-block ml-1" />
            </button>
          </div>
        </div>
        {editingTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Trip</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Trip Name</label>
                <input
                  type="text"
                  name="tripName"
                  value={editingTrip.tripName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Trip Price</label>
                <input
                  type="number"
                  name="tripPrice"
                  value={editingTrip.tripPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  name="stateName"
                  value={editingTrip.stateName}
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
                  name="cityName"
                  value={editingTrip.cityName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select City</option>
                  {editingTripStateCities.map((city) => (
                    <option key={city.cityId} value={city.cityName}>
                      {city.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="tripCategory"
                  value={editingTrip.tripCategory}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Trip Photo</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={saveTrip}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTrip(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this trip?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => deleteTrip(tripToDelete)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Admin>
  );
}

export default TripViewPage;
