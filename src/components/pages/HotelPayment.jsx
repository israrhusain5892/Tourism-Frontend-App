import React, { useEffect, useState, useRef,useContext } from 'react';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import HotelTicket from './HotelTicket';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import '../../App.css';
import ImageCompressor from 'image-compressor.js';
import { emailApiCall } from '../../Service/EmailService';
import Swal from 'sweetalert2';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import Loader from '../Loader';
import useRazorpay from "react-razorpay";
// import { TicketContext } from './ContextProvider';
import apiUrl from "../Axios";
export const HotelTicketContext = React.createContext(null);
function HotelPayment({res}) {


    const payment1=
      {
        "id": 22,
        "receiptNo": "343nhgegyb",
        "order_id": "677767hhyttrt",
        "amount": 30000,
        "paymentStatus": "Success",
        "date": "2024-07-19T10:28:15.104+00:00",
        "user": {
          "userId": 14,
          "name": "imran Husain",
          "mobileNumber": "9897876656",
          "email": "israrhusain866@gmail.com",
          "password": "$2a$10$WAXfUdKVHsd9cI3Fk1caGeHhrEyFA0dCHThLu9EBmlVclmOqA7qM.",
          "roles": [
            {
              "id": 2,
              "name": "ROLE_USER"
            }
          ]
        },
        "bookingId": "HOTELBKID1",
        "bookingStatus": "BOOKED",
        "stayDuration": 1,
        "hotelDetails": {
          "id": 7,
          "name": "Hotel Ashokal",
          "type": "2 star",
          "address": "Station Road, Warangal",
          "city": "Warangal",
          "state": "Telangana",
          "rating": 2,
          "price": 20000.0,
          "url": "http://localhost:8081/public/hotel/download/7"
        }
      
     }
    const [Razorpay] = useRazorpay();
    // const query=new URLSearchParams(useLocation.search);
    // const ref=query.ref;
    // console.log(ref);
    // const { ticketRef, payment, setPayment } = useContext(TicketContext);
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef();
    const location = useLocation();
    var data = location.state || {};
     const[show,setShow]=useState(false);
    useEffect(() => {
        if (data != null) {
            setBookingDetails(data.res);
        }
    }, [data]);

    useEffect(() => {
        if (payment) {
            generateAndSendTicket()
        }
    }, [payment]);

    
   

    const generateAndSendTicket = async () => {
        
        try {
            const ticketDocument=<HotelTicket payment={payment}/>
           

          
                    const emailText = `
                        Dear ${payment.user.name},
                    
                        Congratulation !! on successfully Booking and We are pleased to confirm your booking at ${payment.hotelDetails.name}.
                    
                        Booking Details:
                        - Check-in Date: ${payment.date}
                        - Check-out Date: ${payment.date+payment.stayDuration}
                        -
                    
                        If you have any questions or need further assistance, please feel free to contact us on email helper23@gmail.com.
                    
                        We look forward to welcoming you!
                    
                        Best regards,
                        The ${payment.hotelDetails.name} Team
                        `;
                    const pdfBlob = await pdf(ticketDocument).toBlob();
                    const formData = new FormData();
                    formData.append('to', `${payment.user.email}`);
                    formData.append('subject', `e-Ticket/Hotel Confirmation`);
                    formData.append('text', emailText);
                    formData.append('attachment', pdfBlob, 'HotelTicket.pdf');

                    try {
                        const res = await emailApiCall(formData);
                        if (res.status === 200 || res.status === 201) {
                            setLoading(false);
                            const msg = `Payment done successfully! Ticket has been sent to your email ${payment.user.email}`;
                            Swal.fire('Success', msg, 'success');
                            navigate("/hotels", { state: { msg } });
                        }
                    } catch (error) {
                        alert("Something went wrong while sending email.");
                        setLoading(false);
                    }
                }
            
          catch (error) {
            console.error('Error generating ticket:', error);
        }
    };

    const submitPayment = async (e) => {
        e.preventDefault();


        try {
            const amt = bookingDetails.bookingPrice;
            const result = await axios.post(`${apiUrl}/public/create-order/${amt}`);
            const { amount, id: order_id, currency } = result.data;

            console.log(result);

            const options = {
                key: "rzp_test_m9GtDw9SM8uFLX", // Enter the Key ID generated from the Dashboard
                key_secret: "pvELoNMJuG107DKyjLapBhI7",
                amount: amount,
                currency: currency,
                name: "Indian Tourism",
                description: 'Booking Payment',
                // image:'https://img.freepik.com/free-photo/traveler-accessories-cup-tea-pink-background_23-2147950767.jpg?t=st=1721291423~exp=1721295023~hmac=c3b551172e792245e2494b3a66f214635f630df0ebc46e7862b4f388dee24b2d&w=740',
                order_id: order_id,
                handler: async function (response) {
                    // Handle payment success
                    setLoading(true);
                    console.log(response);
                    await UpdatePayment(result.data);
                },
                theme: {
                    color: '#F37254'
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            alert('Error creating Razorpay order');
            console.log(error);
        }
       
    };

    async function UpdatePayment(response) {
        const userId = bookingDetails.user.userId;
        const hotelBookingId = bookingDetails.bookingId;
        const hotelBookingData = {
            receiptNo: response.receipt,
            order_id: response.id,
            amount: response.amount,
        };

        try {
            const paymentResponse = await axios.post(`${apiUrl}/public/update-order/${userId}/${hotelBookingId}`, hotelBookingData);
            if (paymentResponse) {
                setPayment(paymentResponse.data);
            }
        } catch (error) {
            console.error('Error updating payment:', error);
            setLoading(false);
        }
    }


    return (
        <div>
           {loading && <Loader />}
            <Navbar />
           
            <div className='mx-auto w-[1200px] border mt-36 px-4 shadow-xl py-4 rounded'>
            
                <div className='flex gap-16 '>
                    {bookingDetails && (
                        <>
                            <div><img src={bookingDetails.hotel.url} alt="Hotel" /></div>
                            <div className='bg-[#eee] shadow-md '>
                                <h1 className='py-2 text-xl px-2 shadow-md'>Booking Details</h1>
                                <p className='py-2 shadow px-2'><strong>Booking ID:</strong> <span className='text-green-900 ml-[120px]'>{bookingDetails.bookingId}</span></p>
                                <p className='py-2 shadow px-2'><strong>Book for Days:</strong> <span className='ml-[180px]'>{bookingDetails.bookForDays}</span></p>
                                <p className='py-2 shadow px-2'><strong>Booking Price:</strong><span className='ml-[180px]'>{bookingDetails.bookingPrice}</span> </p>
                                <p className='py-2 shadow px-2'><strong>Booking Status:</strong><span className='text-green-900 ml-[160px]'>{bookingDetails.bookingStatus}</span> </p>

                                <h1 className='py-2 text-xl px-3 shadow-md' >Hotel Details</h1>
                                <p className='py-2 shadow px-2'><strong>Name:</strong><span className='ml-[270px]'>{bookingDetails.hotel.name}</span> </p>
                                <p className='py-2 shadow px-2'><strong>Type:</strong><span className='ml-[270px]'>{bookingDetails.hotel.type}</span> </p>
                                <p className='py-2 shadow px-2'><strong>Address:</strong><span className='ml-[120px]'>{bookingDetails.hotel.address}</span> </p>
                                <p className='py-2 shadow px-2'><strong>Total Price:</strong><span className='ml-[210px]'> ₹ {bookingDetails.bookingPrice}</span> </p>
                            </div>
                        </>
                    )}
                </div>
                
                <button onClick={submitPayment} className='px-6 py-2 mt-4 bg-blue-600 text-xl rounded-md text-white text-center block mx-auto'>Pay Now</button>
                
                
        
            </div>
        </div>
    );
}

export default HotelPayment;
