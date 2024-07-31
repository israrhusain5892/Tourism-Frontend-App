import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from '../assets/login_img.png';
import axios from 'axios';
import { doLogin } from '../Auth';
import apiUrl from '../../Axios';
import Swal from "sweetalert2";
import NavBar from '../Navbar/Navbar';
import Loader from '../Loader';

var link=window.location.origin+"/passwordReset";
const PasswordForgot = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const navigate = useNavigate()
     const[loading,setLoading]=useState(false)
     const[load,setLoad]=useState(false)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
        console.log(link)
    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    
    const handleLogin = async () => {
          setLoading(true)
        try {

            const response = await axios.post(`${apiUrl}/public/send-link/${loginForm.email}?link=${link}`);
                
            if (response.status === 200 || response.status === 202) {
                      setLoad(true)
                      setLoading(false)
                // Swal.fire({
                //     icon: 'success',
                //     title: 'password reset in successfully',
                //     toast: true,
                //     position: 'top-end',
                //     showConfirmButton: false,
                //     timer: 3000,
                //     timerProgressBar: true,
                //     didOpen: (toast) => {
                //         toast.onmouseenter = Swal.stopTimer;
                //         toast.onmouseleave = Swal.resumeTimer;
                //     }
                // });
                // const emailDomain = loginForm.email.split('@')[1];
                // setStep(2);
                // doLogin(response.data, () => {
                //     if (emailDomain === 'numetry.com') {
                //         navigate("/admin/dashboard");
                //     } else {
                //         navigate("/");
                //     }
                // });
                setMessage("password reset link has been sent to your registered email") 
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    const handleOtpVerification = async () => {
        // try {
        //     const response = await fetch('http://localhost:8080/api/users/otp', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ usernameOrEmail, otp }),
        //     });

        //     const data = await response.text();
        //     setMessage(data);
        // } catch (error) {
        //     setMessage('An error occurred. Please try again.');
        // }

        // const generateOtp = () => {
        //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
        //     setGeneratedOtp(otp);
        //     return otp;
        // };

        // const sendOtp = async () => {
        //     const otp = generateOtp();

        //     const templateParams = {
        //         to_name: form.name,
        //         to_email: form.email,
        //         otp: otp,
        //     };

        //     try {
        //         await emailjs.send(
        //             'service_6fba6ot',
        //             'template_jtaowm3',
        //             templateParams,
        //             'kfmE6H6G0rNxfEtky'
        //         );
        //         setIsOtpSent(true);
        //         setShowBtn(false)
        //         alert('OTP sent to your email!');
        //     } catch (error) {
        //         console.error('Failed to send OTP:', error);
        //         alert('Failed to send OTP. Please try again.');
        //     }
        // };

        // if (otp === generatedOtp) {
        //     setIsOtpVerified(true);
        //     setOtp('');
        //     setIsOtpSent(false);
        //     alert('OTP verified successfully!');
        // } else {
        //     alert('Invalid OTP. Please try again.');
        // }



    };




    //   const verifyOtp = () => {
    //     if (otp === generatedOtp) {
    //       setIsOtpVerified(true);
    //       setOtp('');
    //       setIsOtpSent(false);
    //       alert('OTP verified successfully!');
    //     } else {
    //       alert('Invalid OTP. Please try again.');
    //     }
    //   };

    return (
        <section className="">
           {loading && <Loader/> } 
            <NavBar/>
            {/* <div className="shrink-1 mb-2 mt-12 grow-0 basis-auto md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
                <img src={loginimg} className="w-full" alt="Sample image" />
            </div> */}
             
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-12 mx-auto mt-[150px]">
            {load && <div className='p-4 w-[700px] bg-green-100 text-green-900 text-xl mb-24 mx-auto text-center'>{message}</div>}
            <h1 className='text-center text-3xl mb-10'>Password Reset Here !!</h1>
                {/* <div className="flex flex-row items-center justify-center lg:justify-start mb-6"> */}
                    {/* <p className="mb-0 me-4 text-lg font-bold">Reset Password !!</p>
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                        <button
                            type="button"
                            className="mx-1 inline-block h-9 w-9 rounded-full bg-primary fill-black p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                </svg>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="mx-1 inline-block h-9 w-9 rounded-full bg-primary fill-black p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                </svg>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="mx-1 inline-block h-9 w-9 rounded-full bg-primary fill-black p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3c94 0 111.3 61.9 111.3 142.3V448z" />
                                </svg>
                            </span>
                        </button>
                    </div> */}
                {/* </div> */}

                {/* <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-black">Or</p>
                </div> */}

                <div className="">
                    {step === 1 && (
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                            <div className="relative mb-6">
                                <input

                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={loginForm.email}
                                    onChange={handleLoginChange}
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                />
                            </div>
                            {/* <div className="relative mb-6">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                />
                            </div> */}
                            <button
                                type="submit"
                                className="inline-block w-full rounded bg-green-500 hover:bg-green-700 font-bolder text-md px-7 pb-2 pt-3 font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                            >
                                    Submit
                            </button>
                        </form>
                    )}
                    {/* {step === 2 && (
                        <form onSubmit={(e) => { e.preventDefault(); handleOtpVerification(); }}>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-block w-full rounded bg-green-500 hover:bg-green-700 font-bolder text-md px-7 pb-2 pt-3 font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"

                            >
                                Verify OTP
                            </button>
                        </form>
                    )}
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>} */}
                </div>

                {/* <div className="mt-6 flex items-center justify-between">
                    <p className="text-md">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-red-700 text-lg pl-1 hover:underline hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-600">
                            Register
                        </Link>
                    </p>
                </div> */}
            </div>
        </section>
    );
};

export default PasswordForgot;
