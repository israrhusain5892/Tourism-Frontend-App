import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import Admin from './Admin';
import apiUrl from '../../Axios';


function HotelForm(props) {
  const [stateName, setStateName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelType, setHotelType] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelRating, setHotelRating] = useState('');
  const [hotelPrice, setHotelPrice] = useState('');
  const [hotelPhoto, setHotelPhoto] = useState(null);
  const [stateNam, setStateNam] = useState('');
  const [city, setCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}/public/state/`).then((res) => {
      setStates(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleStateChange = (stateName) => {
    const filterCity = cityList.filter((x) => x.stateName === stateName);
    setStateNam(stateName);
    setCities(filterCity);
  };

  useEffect(() => {
    axios.get(`${apiUrl}/public/city/`).then((res) => {
      setCityList(res.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'hotelName':
        setHotelName(value);
        break;
      case 'hotelType':
        setHotelType(value);
        break;
      case 'hotelAddress':
        setHotelAddress(value);
        break;
      case 'hotelRating':
        setHotelRating(value);
        break;
      case 'hotelPrice':
        setHotelPrice(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    setHotelPhoto(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = {
      name: hotelName,
      type: hotelType,
      address: hotelAddress,
      state: stateNam,
      city: cityName,
      rating: hotelRating,
      price: hotelPrice,
    };

    const formDataToSend = new FormData();
    formDataToSend.append('hotelData', JSON.stringify(hotelData));
    formDataToSend.append('file', hotelPhoto);

    // Logging FormData
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(`${apiUrl}/public/hotel`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Data submitted successfully");
      console.log(response.data);
    } catch (error) {
      alert("Something went wrong");
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Admin>
      <div className='mx-auto  pt-28 w-[1000px]'>
        <h2 className="mx-auto text-center text-lg font-600 bg-[#e1bc4d] text-white">ADD HOTEL</h2>
        <div className='hotelForm mx-auto border'>
          <form className="hotelForm1" onSubmit={handleSubmit}>
            <select className='selectItem' name="stateName"
              value={stateNam}
              onChange={e => handleStateChange(e.target.value)}
              required
            >
              <option selected disabled>Select State</option>
              {
                states.map((ele, i) => {
                  return <option key={i} name="stateName" value={ele.stateName}>{ele.stateName}</option>
                })
              }
            </select>
            <select className='selectItem'
              value={cityName}
              onChange={e => setCityName(e.target.value)}
              required
            >
              <option selected disabled>Select City</option>
              {
                cities.map((cityElement, i) => {
                  return <option key={i} value={cityElement.cityName}>{cityElement.cityName}</option>
                })
              }
            </select>
            <input type="text" required name="hotelName" placeholder="Enter Hotel Name" value={hotelName} onChange={handleChange} /><br />
            <input type="text" required name="hotelType" placeholder="Enter Hotel Type" value={hotelType} onChange={handleChange} /><br />
            <input type="text" required name="hotelAddress" placeholder="Enter Hotel Address" value={hotelAddress} onChange={handleChange} /><br />
            <input type="number" required name="hotelRating" placeholder="Enter Hotel Rating" value={hotelRating} onChange={handleChange} /><br />
            <input type="number" required name="hotelPrice" placeholder="Enter Hotel Price" value={hotelPrice} onChange={handleChange} /><br />
            <input type="file" required placeholder="Choose File" name="hotelPhoto" onChange={handleFileChange} /><br />
            <button type="submit">Add Hotel</button>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default HotelForm;
