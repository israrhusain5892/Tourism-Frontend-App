import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import links from "../NavLinks/links";
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { getCurrentUserDetail, isLogin, doLogout } from "../Auth";
import { useNavigate } from "react-router-dom";
import turnoff from '../assets/turn-off.png';
import Swal from 'sweetalert2';


const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [username, setUsername] = useState();
  const [login, setLogin] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLogin());

    if (currentUser != null) {
      setUsername(currentUser.userDto.name);
    }
  }, [login]);

  const Logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        doLogout(() => {
          setLogin(false);
          Swal.fire(
            'Logged out!',
            'You have been logged out.',
            'success'
          );
          navigate("/login");
        });
      }
    });
  };

  return (
    <nav className="bg-[#600180] text-white fixed w-full z-[999] top-0 start-0 border-b  border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3">
        <Link to="/" className="flex items-center overflow-hidden p-0 rtl:space-x-reverse">
          <img src={logo} className="h-20 w-22" alt="Indian Traverse Logo" />
          <span className="self-center font-semibold whitespace-nowrap text-white text-base md:text-lg lg:text-2xl">
            <span className="text-orange-600">Wonders</span>Of<span className="text-green-600">Bharat</span>
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!login && (
            <NavLink
              to="/login"
              className="text-[#600180] bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-black font-bold rounded-lg text-md px-4 py-2 text-center bg-white hover:bg-[#e2e8f0] focus:ring-blue-500"
            >
              Login
            </NavLink>
          )}

          {login && (
            <NavLink onClick={Logout}>
              <div className="flex bg-[#e3edf7] p-2 rounded-lg border border-transparent cursor-pointer transition-transform duration-500 hover:hover:border-gray-300 hover:translate-y-1">
                <img className="w-6 mr-2" src={turnoff} alt="Logout" />
                <p className="text-xl text-[#600180]">{username}</p>
              </div>
            </NavLink>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700  focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${open ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex  flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#600180] bg-transparent md:bg-transparent border-transparent">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block  py-2 px-3 rounded md:p-0 ${isActive
                      ? "text-gray-400  h-full flex items-center"
                      : "text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 text-gray-300 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
