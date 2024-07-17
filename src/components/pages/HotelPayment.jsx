import React, { useEffect, useState, useRef } from 'react';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import HotelTicket from './HotelTicket';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ImageCompressor from 'image-compressor.js';
import { emailApiCall } from '../../Service/EmailService';
import Swal from 'sweetalert2';
import Loader from '../Loader';

function HotelPayment() {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
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
        if (paymentData) {
            setShow(true);
            generateAndSendTicket();
        }
    }, [paymentData]);

    const dataURLToBlob = (dataurl) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const compressImage = (imgData, quality) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgData;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Image compression failed'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = (error) => reject(error);
        });
    };

    const generateAndSendTicket = async () => {
        
        try {
            const input = contentRef.current;

            if (!input) {
                throw new Error('contentRef.current is null or undefined');
            }

            console.log('Content to capture:', input);

            const canvas = await html2canvas(input, { scale: 2 });
            let imgData = canvas.toDataURL('image/png');

            // Compress the image
            const compressedImage = await compressImage(imgData, 0.6);
            const reader = new FileReader();
            reader.readAsDataURL(compressedImage);
            reader.onloadend = async () => {
                imgData = reader.result;

                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, (pdf.internal.pageSize.getHeight() - pdfHeight) / 2, pdfWidth, pdfHeight);
                const pdfBlob = pdf.output('blob');
                console.log(pdfBlob);

                // Convert the PDF Blob to Base64
                const reader2 = new FileReader();
                reader2.readAsDataURL(pdfBlob);
                reader2.onloadend = async () => {
                    
                    const emailText = `
                        Dear ${paymentData.user.name},
                    
                        Congratulation !! on successfully Booking and We are pleased to confirm your booking at ${paymentData.hotelDetails.name}.
                    
                        Booking Details:
                        - Check-in Date: ${paymentData.date}
                        - Check-out Date: ${paymentData.date+paymentData.stayDuration}
                        -
                    
                        If you have any questions or need further assistance, please feel free to contact us on email helper23@gmail.com.
                    
                        We look forward to welcoming you!
                    
                        Best regards,
                        The ${paymentData.hotelDetails.name} Team
                        `;
                    
                    const formData = new FormData();
                    formData.append('to', `${paymentData.user.email}`);
                    formData.append('subject', `e-Ticket/Hotel Confirmation`);
                    formData.append('text', emailText);
                    formData.append('attachment', pdfBlob, 'HotelTicket.pdf');

                    try {
                        const res = await emailApiCall(formData);
                        if (res.status === 200 || res.status === 201) {
                            setLoading(false);
                            // setShow(false)
                            const msg = 'Payment done successfully! Ticket has been sent to your email.';
                            Swal.fire('Success', msg, 'success');
                            navigate("/hotels", { state: { msg } });
                        }
                    } catch (error) {
                        alert("Something went wrong while sending email.");
                        setLoading(false);
                    }
                };
            };
        } catch (error) {
            console.error('Error generating ticket:', error);
        }
    };

    const submitPayment = (e) => {
        e.preventDefault();

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
            alert('Razorpay SDK failed to load. Are you online?');
        };
        script.onload = async () => {
            try {
                const amt = bookingDetails.bookingPrice;
                const result = await axios.post(`http://localhost:8081/public/create-order/${amt}`);
                const { amount, id: order_id, currency } = result.data;

                console.log(result);

                const options = {
                    key: "rzp_test_m9GtDw9SM8uFLX", // Enter the Key ID generated from the Dashboard
                    key_secret: "pvELoNMJuG107DKyjLapBhI7",
                    amount: amount,
                    currency: currency,
                    name: "Indian Tourism",
                    description: 'Booking Payment',
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

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                alert('Error creating Razorpay order');
                console.log(error);
            }
        };
        document.body.appendChild(script);
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
            const paymentResponse = await axios.post(`http://localhost:8081/public/update-order/${userId}/${hotelBookingId}`, hotelBookingData);
            if (paymentResponse) {
                setPaymentData(paymentResponse.data);
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
                <button onClick={generateAndSendTicket} className='bg-blue-700 px-5 py-3 text-white rounded'>
                    Download Ticket
                </button>
                <button onClick={submitPayment} className='px-6 py-2 mt-4 bg-blue-600 text-xl rounded-md text-white text-center block mx-auto'>Pay Now</button>
                
               <HotelTicket ref={contentRef} payment={paymentData} />
        
            </div>
        </div>
    );
}

export default HotelPayment;
