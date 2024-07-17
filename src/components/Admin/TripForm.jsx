import React from 'react';
import './Admin.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import tripImage from '../assets/travel-concept-with-baggage.jpg';
import Admin from './Admin';
import apiUrl from '../../Axios';


function TripForm(props) {
       
    const [stateName, setStateNamee] = useState('');
    const [tripName, setTripName] = useState('');
    const [tripAddress, setTripAddress] = useState('');
    const [tripPrice, setTripPrice] = useState('');
    const [tripPhoto, setTripPhoto] = useState(null);
    const [stateNam, setStateName] = useState();
    const [toggleState, setToggleState] = useState(false)
    const [city, setCity] = useState();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [categories, setCategories] = useState([]);

  const [cityName, setCityName] = useState();
  const [categoryName, setCategoryName] = useState();
  

  useEffect(() => {
    axios.get(`${apiUrl}/public/tripCategory/`).then((res => {
      console.log(res.data);
      setCategories(res.data)
    }))
  }, [])

    useEffect(() => {
        axios.get(`${apiUrl}/public/state/`).then((res) => {
          console.log(res.data);
          setStates(res.data);
        }).catch((error) => {
          console.log(error);
        })
      }, [])

      const handleStateChange = (stateName) => {
        const filterCity = cityList.filter((x) => x.stateName === stateName);
        setStateName(stateName)
        console.log(filterCity);
        setCities(filterCity)
    
      }
    
      useEffect(() => {
    
        axios.get(`${apiUrl}/public/city/`).then((res) => {
          // console.log(res.data)
          setCityList(res.data);
        }).catch(error => {
          console.log(error);
        })
    
    
      }, [])
    


    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
    
          case 'tripName':
            setTripName(value);
            break;
          case 'tripAddress':
            setTripAddress(value);
            break;
          case 'tripPrice':
            setTripPrice(value);
            break;
          default:
            break;
        }
      };
    
      // Handle file selection
      const handleFileChange = (event) => {
        setTripPhoto(event.target.files[0]);
      };
    
      const tripData = JSON.stringify({
        tripName: tripName,
        tripAddress: tripAddress,
        tripPrice: tripPrice,
    
      });
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('tripData', tripData);
        // formDataToSend.append('tripAddress', formData.tripAddress);
        // formDataToSend.append('tripPrice', formData.tripPrice);
        formDataToSend.append('tripPhoto', tripPhoto);
    
        console.log(formDataToSend);
        const state = "Uttar Pradesh";
    
        try {
          const response = await axios.post(`${apiUrl}/public/trip/${stateNam}/${cityName}/${categoryName}`, formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert("submit data successfully");
          console.log(response.data);
        } catch (error) {
          alert("some thing went wrong");
          console.error('Error submitting form:', error);
        }
      };
    
    return (
      <Admin>
         <div className=' mx-auto  pt-28 w-[1000px]'>
            <h2 className="mx-auto text-center text-lg font-600 bg-[#e1bc4d] text-white">ADD TRIP</h2>
         {/* <div className='w-[600px]'><img src={tripImage} className='w-[600px]'/></div> */}
          
            <div className='tripForm mx-auto border '>


                <form

                    className="tripForm1"
                    onSubmit={handleSubmit}>
                    <select className='selectItem' name="stateName"

                        value={stateNam}
                    
                        onChange={e => handleStateChange(e.target.value)}
                        required
                    >
                        <option selected disabled>Select state</option>
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


                    <select className='selectItem'
                        value={categoryName}

                        onChange={e => setCategoryName(e.target.value)}
                        required
                    >
                        <option selected disabled className='text-gray-600'>Select Category</option>
                        {
                            categories.map((category, i) => {
                                return <option required key={i} value={category.categoryName}>{category.categoryName}</option>
                            })
                        }
                    </select>


                    <input type="text" required name="tripName" placeholder="Enter trip Name" value={tripName} onChange={handleChange} /><br></br>
                    <input type="text" required name="tripAddress" placeholder="Enter trip Address" value={tripAddress} onChange={handleChange} /><br></br>
                    <input type="number" required name="tripPrice" placeholder="Enter trip Price" value={tripPrice} onChange={handleChange} /><br></br>
                    <input type="file" required placeholder="choose file" name="tripPhoto" onChange={handleFileChange} /><br></br>
                    <button type="submit">Add Trip</button>
                </form>
            </div>

        </div>
        </Admin>
    );
}

export default TripForm;