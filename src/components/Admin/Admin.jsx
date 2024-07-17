import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './Admin.css';
import { getCurrentUserDetail, isLogin, doLogout } from "../Auth";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TripForm from './TripForm';
import TripViewPage from './TripViewPage';
import photo from '../assets/Aditya_kapoor.jpg';
import Loader from '../Loader';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import HotelForm from './HotelForm';
import apiUrl from '../../Axios';

function Admin({ children }) {
  const [addressView, setAddressView] = useState(false);
  const [packageView, setPackageView] = useState(false);
  const [tranView, setTransView] = useState(false);
  const [hotelView, setHotelView] = useState(false);
  const [bookingView, setBookingView] = useState(false);
  const [payView, setPayView] = useState(false);
  const menu = [
    {
      label: 'Add Trip',
      link: '/admin/trip'
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(isLogin());
    setCurrentUser(getCurrentUserDetail());

    if (currentUser != null) {
      setUsername(currentUser.userDto.name);
      setEmail(currentUser.userDto.email);
    }
  }, [login, currentUser]);

  const Logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [stateNamee, setStateNamee] = useState('');
  const [tripName, setTripName] = useState('');
  const [tripAddress, setTripAddress] = useState('');
  const [tripPrice, setTripPrice] = useState('');
  const [tripPhoto, setTripPhoto] = useState(null);
  const [stateNam, setStateName] = useState();
  const [toggleState, setToggleState] = useState(false);
  const [city, setCity] = useState();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [tripView, setTripView] = useState(false);
  const [margin, setMargin] = useState(0);
  const [profileMenu, setProfileMenu] = useState(false);

  const [categories, setCategories] = useState([]);
  const [cityName, setCityName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [stateForm, setSateForm] = useState(false);
  const [cityForm, setCityForm] = useState(false);
  const [view, setView] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [tripResponse, setTripResponse] = useState([]);

  const fetchTodoList = async () => {
    const res = await axios.get(`${apiUrl}/public/trip/`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    setTripResponse(res.data);
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  });

  useEffect(() => {
    axios.get(`${apiUrl}/public/state/`).then((res) => {
      setStates(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/public/city/`).then((res) => {
      setCityList(res.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const tripData = JSON.stringify({
    tripName: tripName,
    tripAddress: tripAddress,
    tripPrice: tripPrice,
  });

  useEffect(() => {
    axios.get(`${apiUrl}/public/tripCategory/`).then((res => {
      setCategories(res.data);
    }));
  }, []);

  const handleStateForm = async (e) => {
    e.preventDefault();
    await axios.post(`${apiUrl}/public/state/`, {
      stateName: stateNam
    });
    alert("saved succesfully!");
    setSateForm(false);
  };

  const handleCityForm = async (e) => {
    e.preventDefault();
    if (stateNamee != null) {
      await axios.post(`${apiUrl}/public/city/${stateNamee}`, {
        cityName: cityName
      });
      alert("saved successfully !");
      setCityForm(false);
    } else {
      alert("cityName cannot be null");
    }
  };

  function showView() {
    setView(true);
    setViewForm(true);
    setTripView(false);
  }

  function tripView1() {
    setView(true);
    setViewForm(false);
    setTripView(true);
  }

  function Main() {
    navigate("/admin/dashboard");
  }

  return (
    <div>
      <aside style={{ marginLeft: margin, transition: '0.3s' }} className=' flex md:w-[250px] h-full left-0 top-0 bg-[#1679AB] space-y-7 py-0 px-2 fixed'>
        <div>
          <div onClick={Main} className="w-full space-x-[-7px]">
            <i className="fas fa-user-circle fa-3x text-blue-500"></i>
            <Button className='bg-[#FFCBCB] h-[69.6px]  shadow-xl px-[10px] mr-16 py-2 w-[250px]'>
              <span className="text-2xl font-extrabold text-black">Admin</span>
            </Button>
          </div>
          <nav>
            <div>
              <div onClick={() => setAddressView(!addressView)} className='py-2 mt-4 px-2 transition hover:bg-blue-500 duration-200 text-white'>
                <i className="ri-building-fill px-2 text-xl"></i>
                <Link className="text-lg font-semibold">Address </Link>
              </div>
              {addressView && (
                <div className='py-1 ml-8'>
                  <div className='transition duration-200 hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill text-white"></i>
                    <Link className='py-0.5 px-4 font-semibold text-white' onClick={(e) => setSateForm(!stateForm)}>Add State</Link>
                    {stateForm && (
                      <form className='stateForm mt-4' style={{ marginTop: 10, marginInline: 0 }} onSubmit={handleStateForm}>
                        <input
                          value={stateNam}
                          required
                          onChange={(e) => setStateName(e.target.value)}
                          style={{
                            padding: 6,
                            width: 200,
                            borderRadius: 5,
                            outline: 'none',
                            border: '1px solid gray',
                            marginTop: '-10PX'
                          }}
                          type="text"
                          placeholder='enter state'
                        />
                        <button
                          style={{
                            padding: 4,
                            width: 200,
                            background: 'blue',
                            border: 'none',
                            color: 'white',
                            borderRadius: 5,
                            marginTop: 2
                          }}
                          type="submit"
                        >Add State</button>
                      </form>
                    )}
                  </div>
                  <div className='transition duration-200 hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill text-white"></i>
                    <Link onClick={(e) => setCityForm(!cityForm)} className="py-0.5 px-4 font-semibold text-white">
                      Add City
                    </Link>
                    {cityForm && (
                      <div>
                        <select className='selectItem' name="stateName"
                          value={stateNamee}
                          onChange={e => setStateNamee(e.target.value)}
                          style={{ width: 200, borderRadius: '!important none', marginTop: 2, marginBottom: 1, padding: 7 }}
                        >
                          <option selected disabled>Select state</option>
                          {states.map((ele, i) => (
                            <option key={i} name="stateName" value={ele.stateName}>{ele.stateName}</option>
                          ))}
                        </select>
                        <form className='stateForm' style={{ marginTop: 2, marginInline: 0 }} onSubmit={handleCityForm}>
                          <input
                            value={cityName}
                            required
                            onChange={(e) => setCityName(e.target.value)}
                            style={{
                              padding: 7,
                              borderRadius: 5,
                              width: 200,
                              outline: 'none',
                              border: '1px solid gray',
                              marginRight: 0,
                            }}
                            type="text"
                            placeholder='enter city'
                          />
                          <button
                            style={{
                              padding: 7,
                              background: 'blue',
                              width: 200,
                              border: 'none',
                              color: 'white',
                              marginTop: 3,
                              borderRadius: 5
                            }}
                            type="submit"
                          >add city</button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div onClick={() => setPackageView(!packageView)} className='py-1 px-2 transition hover:bg-blue-500 duration-200 text-white'>
                <i className="ri-red-packet-line px-2 text-lg"></i>
                <Link className='text-lg font-semibold'>Package </Link>
              </div>
              {packageView && (
                <div className='text-white ml-8'>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/tripform" className='px-2 font-semibold'>Add Trip</Link>
                  </div>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/tripview" className='px-2 font-semibold'>View Trips</Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className='py-1 px-2 transition hover:bg-blue-500 duration-200 text-white'>
                <i className="ri-hotel-line text-lg px-2"></i>
                <Link onClick={() => setHotelView(!hotelView)} className='text-lg font-semibold'>Hotel </Link>
              </div>
              {hotelView && (
                <div className='text-white ml-8'>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/hotelform" className='px-2 font-semibold'>Add Hotel</Link>
                  </div>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/hotelview" className='px-2 font-semibold'>View Hotels</Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className='py-1 px-2 transition hover:bg-blue-500 duration-200 text-white'>
                <i className="ri-bus-fill text-lg px-2"></i>
                <Link onClick={() => setTransView(!tranView)} className='text-lg font-semibold'>Transport </Link>
              </div>
              {tranView && (
                <div className='text-white ml-8'>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/transportform" className='px-2 font-semibold'>Add Bus</Link>
                  </div>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/transportation" className='px-2 font-semibold'>View Buses</Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className='py-1 px-2 transition hover:bg-blue-500 duration-200 text-white'>
                <i className="ri-ticket-2-line text-lg px-2"></i>
                <Link onClick={() => setBookingView(!bookingView)} className='text-lg font-semibold'>Booking </Link>
              </div>
              {bookingView && (
                <div className='text-white ml-8'>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link className='px-2 font-semibold'>Trip Bookings</Link>
                  </div>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link to="/admin/busbookingview" className='px-2 font-semibold'>Bus Bookings</Link>
                  </div>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link className='px-2 font-semibold'>Hotel Bookings</Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className='py-1 px-2 transition hover:bg-blue-500 duration-200 text-white'>
                <i className="ri-money-rupee-circle-line text-lg px-2"></i>
                <Link onClick={() => setPayView(!payView)} className='text-lg font-semibold'>Payment </Link>
              </div>
              {payView && (
                <div className='text-white ml-8'>
                  <div className='hover:bg-blue-500'>
                    <i className="ri-checkbox-blank-circle-fill"></i>
                    <Link className='px-2 font-semibold'>View Payments</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>
      <section className='bg-[#eee] h-screen ' style={{ marginLeft: margin == 0 ? 250 : 0, transition: '0.3s' }}>
        <nav className="bg-[#1679AB] p-4 fixed z-[999] w-full pr-[300px]">
          <svg
            onClick={() => setMargin(margin == -300 ? 0 : -300)}
            className='w-[20px] p-0 mt-3 mr-10 absolute fill-white'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white ml-[40px] text-2xl font-bold">Admin Panel</div>
            <div className="block lg:hidden">
              <button onClick={toggleMenu} className="text-black focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} flex justify-end lg:flex lg:items-end lg:w-auto w-full`}>
              <ul className="lg:flex lg:space-x-6 space-y-2 lg:space-y-0">
                <li>
                  <Link className="text-white text-lg px-2 py-1 hover:bg-dark-navy hover:text-white block lg:inline-block">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-lg px-2 py-1 hover:bg-dark-navy hover:text-white block lg:inline-block">
                    Users
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-lg px-2 py-1 hover:bg-dark-navy hover:text-white block lg:inline-block">
                    Settings
                  </Link>
                </li>
                <li>
                  <div>
                    <button className='relative'>
                      <img className='w-8 h-8 rounded-full hover:scale-125' onClick={() => setProfileMenu(!profileMenu)} src={photo} />
                      {profileMenu && (
                        <div className='min-w-[200px] p-6 shadow-lg absolute bg-white top-10 right-0 z-50'>
                        <div>
                          <h1 className='admin-name text-lg hover:bg-gray-200 font-semibold'>{username}</h1>
                          <p className='admin-email text-gray-500 hover:bg-[#eee]'>{email}</p>
                          <div className='h-px bg-gray-300 my-4' />
                          <button className='flex hover:bg-gray-200 w-[200px] justify-center mx-auto gap-2 items-center' onClick={Logout}>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                      
                      )}
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </section>
      {tripView && <TripViewPage isPending={isPending} list={tripResponse} />}
      {viewForm && <TripForm />}
    </div>
  );
}

export default Admin;
