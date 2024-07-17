import React from 'react';
import logo from '../assets/logo2.png'

export default function Component() {
    return (
        <footer className="bg-[#600180] py-4 md:py-8 lg:py-5 bg-[#600180] z-999">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col items-start">
                        <a className="flex items-center" href="#">
                            {/* <MountainIcon className="h-8 w-8 text-gray-900 text-gray-50" /> */}
                            <img src={logo} alt="Logo" className='h-20 w-20' />
                            <span className="ml-2 text-2xl font-bold text-white">
                                <span className="text-orange-600">Wonders</span>Of<span className="text-green-600">Bharat</span>
                            </span>

                        </a>
                        <p className="mt-4 text-gray-100">
                            Discover the India with us. Explore new destinations, immerse yourself in local cultures, and create unforgettable memories.
                        </p>
                    </div>
                    <div className='py-8'>
                        <h4 className="mb-4 text-lg font-bold text-white ">Navigation</h4>
                        <nav className="space-y-2 flex flex-col">
                            <a className="text-white hover:text-gray-400" href="#">
                            </a>
                            <a className="text-white hover:text-gray-400" href="#">
                                Experience</a>
                            <a className="text-white hover:text-gray-400" href="#">
                                About Us
                            </a>
                            <a className="text-white hover:text-gray-400" href="#">
                                Contact
                            </a>
                        </nav>
                    </div>
                    <div className='py-8'>
                        <h4 className="mb-4 text-lg font-bold text-white">Contact</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <InboxIcon className="h-5 w-5 text-white" />
                                <a className="ml-2 text-white hover:text-gray-900  hover:text-gray-50" href="#">
                                    info@wondersofbharat.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-white" />
                                <a className="ml-2 text-white hover:text-gray-900 text-gray-400 hover:text-gray-50" href="#">
                                    +91 123-456-7890
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='py-8'>
                        <h4 className="mb-4 text-lg font-bold text-white text-gray-50">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a className="text-white hover:text-gray-900 text-gray-400 hover:text-gray-50" href="#">
                                <FacebookIcon className="h-6 w-6" />
                            </a>
                            <a className="text-white hover:text-gray-900 text-gray-400 hover:text-gray-50" href="#">
                                <TwitterIcon className="h-6 w-6" />
                            </a>
                            <a className="text-white hover:text-gray-900 text-gray-400 hover:text-gray-50" href="#">
                                <InstagramIcon className="h-6 w-6" />
                            </a>
                            <a className="text-white hover:text-gray-900 text-gray-400 hover:text-gray-50" href="#">
                                <LinkedinIcon className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* <div className="text-gray-100  text-gray-100 flex justify-center">2024 Indian Traverse</div> */}
            </div>
            <div className=" p-1 text-center text-gray-100  text-gray-100">
                <span>© 2024 Copyright: </span>
                <a
                    className="font-semibold text-neutral-100 text-neutral-100"
                    href="/"
                >
                    Wonders of Bharat
                </a>
            </div>
        </footer>
    );
}

function FacebookIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function InboxIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
    );
}

function InstagramIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function LinkedinIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}

function PhoneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function TwitterIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24px" height="24px"
            // {...props}
            // xmlns="http://www.w3.org/2000/svg"
            // width="24"
            // height="24"
            // viewBox="0 0 24 24"
            // fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z" />
        </svg>
    );
}
