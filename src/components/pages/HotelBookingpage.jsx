import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from 'axios';
import Swal from 'sweetalert2';
import apiUrl from '../../Axios';
import HotelPayment from './HotelPayment';
import Loader from '../Loader';
const BookNow = () => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);
  const[HotelBookingRespone,setHotelBookingResponse]=useState(null);;
  const location = useLocation();
  const { hotel } = location.state || {};
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    phone: '',
    stayDuration: 1,
    roomType: 'Standard',
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem("data"));;
    if (userData) {
      // Update formData with user's email and phone
      setFormData({
        ...formData,
        name: userData.userDto.name,
        email: userData.userDto.email,
        phone: userData.userDto.mobileNumber,
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once

  if (!hotel) {
    navigate('/'); // Redirect to home if no hotel data is passed
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(formData.email)
    try {
      
      const response = await axios.post(`${apiUrl}/public/bookings/${formData.email}/${hotel.id}?bookForDays=${formData.stayDuration}`, {
       
       });
       
       if (response.status === 200 || response.status===201) {
         setLoading(false)
        Swal.fire('Success', 'Your booking is confirmed!', 'success');
         const res=response.data;
        navigate('/payment',{ state: {res} });
      } else {
        Swal.fire('Error', 'There was an issue with your booking.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'There was an issue with your booking.', 'error');
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = hotel.price;
    const roomMultiplier = formData.roomType === 'Executive' ? 1.5 : formData.roomType === 'Deluxe' ? 2 : 1;
    return basePrice * roomMultiplier * formData.stayDuration;
  };

  return (
    <>
     {loading && <Loader/>} 
      <Navbar />
      <div className="container mx-auto mt-20 p-16 flex flex-col lg:flex-row bg-white shadow-lg rounded-lg">
        <div className="w-full lg:w-1/2">
          <img
            src={hotel.url || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={hotel.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
          <p className="text-gray-600 mb-4">{hotel.address}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
              <label className="block text-gray-700 mb-1">User Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Stay Duration (days)</label>
              <input
                type="number"
                name="stayDuration"
                value={formData.stayDuration}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Room Type</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
              >
                <option value="Standard">Standard</option>
                <option value="Executive">Executive</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Total Price</label>
              <input
                type="text"
                value={`₹${calculateTotalPrice()}`}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookNow;
