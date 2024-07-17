import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import Admin from './Admin';
import apiUrl from '../../Axios';

function TransportForm() {
  const [busNumber, setBusNumber] = useState('');
  const [busType, setBusType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [seatAvailable, setSeatAvailable] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [routes, setRoutes] = useState([{ origin: '', destination: '', distance: '', departTime: '', arriveTime: '' }]);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/bus`);
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleBusSubmit = async (e) => {
    e.preventDefault();

    const busData = {
      bus_number: busNumber,
      busType: busType,
      capacity: capacity,
      seatAvailable: seatAvailable,
      imageUrl: imageUrl,
      routes: routes,
    };

    try {
      const response = await axios.post(`${apiUrl}/public/bus`, busData);
      alert("Bus and routes added successfully");
      console.log(response.data);
      fetchBuses(); // Refresh the bus list
    } catch (error) {
      alert("Something went wrong");
      console.error('Error submitting form:', error);
    }
  };

  const handleRouteChange = (index, event) => {
    const { name, value } = event.target;
    const newRoutes = [...routes];
    newRoutes[index][name] = value;
    setRoutes(newRoutes);
  };

  const addRoute = () => {
    setRoutes([...routes, { origin: '', destination: '', distance: '', departTime: '', arriveTime: '' }]);
  };

  const removeRoute = (index) => {
    const newRoutes = routes.filter((_, routeIndex) => routeIndex !== index);
    setRoutes(newRoutes);
  };

  return (
    <Admin>
      <div className='mx-auto pt-28 w-full max-w-4xl'>
        <h2 className="mx-auto text-center text-lg font-semibold bg-yellow-600 text-white py-2">ADD BUS</h2>
        <div className='busForm mx-auto border p-4'>
          <form className="busForm1 flex flex-col gap-4" onSubmit={handleBusSubmit}>
            <select className='selectItem p-2 border border-gray-300 rounded' name="busType" value={busType} onChange={e => setBusType(e.target.value)} required>
              <option selected disabled>Select Bus Type</option>
              <option value="Luxury">Luxury</option>
              <option value="Deluxe">Deluxe</option>
              <option value="AC">AC</option>
            </select>
            <input className='p-2 border border-gray-300 rounded' type="text" required name="busNumber" placeholder="Enter Bus Number" value={busNumber} onChange={e => setBusNumber(e.target.value)} />
            <input className='p-2 border border-gray-300 rounded' type="number" required name="capacity" placeholder="Enter Capacity" value={capacity} onChange={e => setCapacity(e.target.value)} />
            <input className='p-2 border border-gray-300 rounded' type="number" required name="seatAvailable" placeholder="Enter Seats Available" value={seatAvailable} onChange={e => setSeatAvailable(e.target.value)} />
            <input className='p-2 border border-gray-300 rounded' type="text" required placeholder="Enter Image URL" name="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <h3 className='text-lg font-semibold'>Routes</h3>
            {routes.map((route, index) => (
              <div key={index} className="routeFields flex flex-col gap-2 p-2 border border-gray-300 rounded">
                <input className='p-2 border border-gray-300 rounded' type="text" required name="origin" placeholder="Enter Origin" value={route.origin} onChange={e => handleRouteChange(index, e)} />
                <input className='p-2 border border-gray-300 rounded' type="text" required name="destination" placeholder="Enter Destination" value={route.destination} onChange={e => handleRouteChange(index, e)} />
                <input className='p-2 border border-gray-300 rounded' type="number" required name="distance" placeholder="Enter Distance" value={route.distance} onChange={e => handleRouteChange(index, e)} />
                <input className='p-2 border border-gray-300 rounded' type="text" required name="departTime" placeholder="Enter Departure Time" value={route.departTime} onChange={e => handleRouteChange(index, e)} />
                <input className='p-2 border border-gray-300 rounded' type="text" required name="arriveTime" placeholder="Enter Arrival Time" value={route.arriveTime} onChange={e => handleRouteChange(index, e)} />
                {routes.length > 1 && (
                  <button className='bg-red-500 text-white py-1 px-2 rounded mt-2' type="button" onClick={() => removeRoute(index)}>Remove Route</button>
                )}
              </div>
            ))}
            <button className='bg-blue-500 text-white py-2 px-4 rounded' type="button" onClick={addRoute}>Add Route</button>
            <button className='bg-green-500 text-white py-2 px-4 rounded' type="submit">Add Bus</button>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default TransportForm;
