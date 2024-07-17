import React from 'react';
import Navbar from "../Navbar/Navbar";
import logo from '../assets/logo2.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef, forwardRef, useImperativeHandle} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';
import ImageCompressor from 'image-compressor.js';
import { emailApiCall } from '../../Service/EmailService';
import { useState } from 'react';
// import emailApiCall from '../src/Service/emailApiCall';



const HotelTicket=forwardRef(({payment}, ref) =>{
  
  
  const contentRef = useRef();
   const[empty,setEmpty]=useState(null);
 
  
  console.log(payment)
  const navigate =useNavigate();
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
          blob => {
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

   const downloadTicket = async () => {


    const input = contentRef.current;
    const canvas = await html2canvas(input, { scale: 2 });  // Reduce scale for lower resolution
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

      // Convert the PDF Blob to Base64
      const reader2 = new FileReader();
      reader2.readAsDataURL(pdfBlob);
      const textContent = input.innerText;
        
    //   const emailText = `
    //   Dear ${payment.user.name},
  
    //   Congratulation !! on successfully Booking and We are pleased to confirm your booking at ${paymentData.hotelDetails.name}.
  
    //   Booking Details:
    //   - Check-in Date: ${payment.date}
    //   - Check-out Date: ${payment.date+payment.stayDuration}
    //   -
  
    //   If you have any questions or need further assistance, please feel free to contact us on email helper23@gmail.com.
  
    //   We look forward to welcoming you!
  
    //   Best regards,
    //   The ${payment.hotelDetails.name} Team
    // `;
  
       
        const formData = new FormData();
        formData.append('to',`israrhusain5892@gmail.com`);
        formData.append('subject',`e-Ticket/Hotel Confirmation`);
        formData.append('text','hi');
        formData.append('attachment', pdfBlob, 'HotelTicket.pdf');
        // formData.append('content', textConte nt);
        
        try{
          const  res=await emailApiCall(formData);
           if(res.status===200 || res.status===201){
               const message="payemnt done successfully and Hotel ticket has been sent tou your email "+payment.user.email;
                alert('email sent successfully !!')
              //  navigate('/hotels',{state:{message}})
                return message;
              }
           
        }
        catch(error){
           const message="some thinfg went wrong ";
            // navigate('/hotels',{state:{message}})
        }
        

        

      
    };

    useEffect(() => {
      if (ref) {
        ref.current = {
          downloadTicket: downloadTicket
        };
      }
    }, [ref, downloadTicket]);
    // alert("ticket download succesffuly")
  }
  return (
    <div className='relative py-40'>
      <Navbar />
      <p className='text-center  text-xl text-green-800 mt-[-30px]'>Hotel payment donre successfully !! you can download ticket for downloading <button className='text-blue-700 text-xl font-semibold' onClick={downloadTicket}>click here</button></p>
      <div className=' mx-auto mt-10  w-[800px] border border-gray-300 px-5 py-5 min-h-[800px]' ref={ref}>
        <h1 className='mx-auto text-center font-bold w-full mb-3 text-xl text-yellow-900'>e-Ticket/Hotel</h1>
        <header className='flex items-center justify-between'>
          <h1 className='flex items-center gap-1'>
            <img className='w-[60px]' src={logo} alt='logo' />
            <span className="self-center font-semibold whitespace-nowrap text-white-600 text-base md:text-lg lg:text-2xl">
              <span className="text-orange-600">Wonders</span>Of<span className="text-green-600">Bharat</span>
            </span>
          </h1>
          <h1 className='pr-10 text-xl text-semibold text-yellow-900'>Hotel Confirmation e-ticket</h1>
        </header>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div>
        <div className='py-5'>
          <h1 className='text-xl font-bold text-gray-700  ml-5'>Customer Details:</h1>
          <div className='flex justify-between mt-5 mx-auto w-[600px]'>
            {/* <h2 className='text-lg'><span className='font-bold text-gray-500'>Customer's Name:</span> {paymentData.user.name}</h2> */}
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Mobile:</span> {payment!=null?payment.user.mobileNumber:''}</h2>
          </div>

          <div className='flex justify-between mt-5 mx-auto w-[600px]'>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Email:</span> {payment!=null?payment.user.email:''}</h2>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Pin Code:</span> 265407</h2>
          </div>

        </div>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto '></div>

        {/* Booing eti */}

        <div className='py-4'>
          <h1 className='text-xl font-bold text-gray-700  ml-5'>Booking Details:</h1>
          <div className='flex justify-between mt-5 mx-auto w-[600px]'>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Booking Id:</span> {payment!=null?payment.bookingId:''}</h2>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Booking Status:</span> {payment!=null?payment.bookingStatus:''}</h2>
          </div>

          <div className='flex justify-between mt-5 mx-auto w-[600px]'>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Stay Duration:</span> {payment!=null?payment.stayDuration:''} days</h2>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Date:</span> {payment!=null?payment.date:''}</h2>
          </div>

          <table className='mx-auto border border-gray-700 w-[630px] mt-5 text-center px-5 h-[100px]'>
            <tr className='px-5 border border-gray-700'>
              <th className='border border-gray-700 text-gray-500'>Sr No.</th>
              <th className='border border-gray-700 text-gray-500'>Orer No</th>
              <th className='border border-gray-700 text-gray-500'>Receipt No.</th>
              <th className='border border-gray-700 text-gray-500'>Amount</th>

              <th className='border border-gray-700 text-gray-500'>PaymentStatus</th>
            </tr>


            <tr className='border border-gray-700'>
              <td className='border border-gray-700'>1</td>
              <td className='border border-gray-700'>{payment!=null?payment.order_id:''}</td>
              <td className='border border-gray-700'>{payment!=null?payment.receiptNo:''}</td>
              <td className='border border-gray-700'> ₹ {payment!=null?payment.amount:''}</td>
              <td className='border border-gray-700  text-[green]'>{payment!=null?payment.paymentStatus:''}</td>
            </tr>
          </table>

        </div>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div>


        {/* hotel detai */}

        <div className='py-5'>
          <h1 className='text-xl font-bold text-gray-700  ml-5'>Hotel Details:</h1>
          <div className='flex justify-between mt-5 mx-auto w-[600px]'>
            <h2 className='text-xl text-semibold'> {payment!=null ?payment.hotelDetails.name : empty}</h2>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Type:</span> {payment!=null?payment.hotelDetails.type:empty}</h2>
          </div>

          <div className='flex justify-between mt-5 mx-auto w-[600px]'>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Address:</span> {payment!=null?payment.hotelDetails.address:empty}</h2>
            <h2 className='text-lg'><span className='font-bold text-gray-500'>Pin Code:</span> 265407</h2>
          </div>

        </div>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div>
        <div className='px-5 py-5'>
          <h1 className='font-bold text-gray-900'>Important Note: Booked & Payable at Wondersofbharat.com</h1>
        </div>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div>

        {/* <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div> */}
        <div className='px-5 py-5 mt-2'>
          <h1 className='font-bold font-freesans text-gray-900'>Description of Service: Reservation services for accommodation</h1>
        </div>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div>

        <div className='px-5 py-5 mt-2'>
          <h1 className='font-bold font-freesans text-gray-900'>Congratulations! You have just booked a Gostays certified hotel from us. This Hotel (Hotel Sai Miracle)
            has been inspected with an exhaustive check list and certified on delivering a delightful stay.

          </h1>
        </div>
        <div className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></div>
      </div>
      <div className='mx-auto  w-full flex justify-center mt-10'><button onClick={downloadTicket} className='bg-blue-700 px-5 py-3 text-white rounded '>Download Ticket</button></div>
    </div>
  );
})

export default HotelTicket;