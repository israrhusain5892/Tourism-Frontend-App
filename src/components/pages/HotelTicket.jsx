// import React from 'react';
// import Navbar from "../Navbar/Navbar";
import logo from '../assets/logo2.png';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useRef, forwardRef, useImperativeHandle,useContext} from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import emailjs from 'emailjs-com';
// import ImageCompressor from 'image-compressor.js';
// import { emailApiCall } from '../../Service/EmailService';
// import { useState } from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// // import emailApiCall from '../src/Service/emailApiCall';
// import { TicketContext } from './ContextProvider';
 

// const HotelTicket=forwardRef(({payment },ref) => {
  
  
//    const[empty,setEmpty]=useState(null);
// //   const contentRef = useRef();
// //   const { ticketRef, payment } = useContext(TicketContext);

// //   useImperativeHandle(ticketRef, () => ({
// //     downloadTicket
// //   }));
  
// //   console.log(payment)
// //   const navigate =useNavigate();
// //   const dataURLToBlob = (dataurl) => {
// //     const arr = dataurl.split(',');
// //     const mime = arr[0].match(/:(.*?);/)[1];
// //     const bstr = atob(arr[1]);
// //     let n = bstr.length;
// //     const u8arr = new Uint8Array(n);
// //     while (n--) {
// //       u8arr[n] = bstr.charCodeAt(n);
// //     }
// //     return new Blob([u8arr], { type: mime });
// //   };

// //   const compressImage = (imgData, quality) => {
// //     return new Promise((resolve, reject) => {
// //       const img = new Image();
// //       img.src = imgData;
// //       img.onload = () => {
// //         const canvas = document.createElement('canvas');
// //         const ctx = canvas.getContext('2d');
// //         canvas.width = img.width;
// //         canvas.height = img.height;
// //         ctx.drawImage(img, 0, 0);
// //         canvas.toBlob(
// //           blob => {
// //             if (blob) {
// //               resolve(blob);
// //             } else {
// //               reject(new Error('Image compression failed'));
// //             }
// //           },
// //           'image/jpeg',
// //           quality
// //         );
// //       };
// //       img.onerror = (error) => reject(error);
// //     });
// //   };

// //    const downloadTicket = async () => {


// //     const input = contentRef.current;
// //     const canvas = await html2canvas(input, { scale: 2 });  // Reduce scale for lower resolution
// //     let imgData = canvas.toDataURL('image/png');

// //     // Compress the image
// //     const compressedImage = await compressImage(imgData, 0.6);
// //     const reader = new FileReader();
// //     reader.readAsDataURL(compressedImage);
// //     reader.onloadend = async () => {
// //       imgData = reader.result;

// //       const pdf = new jsPDF('p', 'mm', 'a4');
// //       const imgProps = pdf.getImageProperties(imgData);
// //       const pdfWidth = pdf.internal.pageSize.getWidth();
// //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

// //       pdf.addImage(imgData, 'PNG', 0, (pdf.internal.pageSize.getHeight() - pdfHeight) / 2, pdfWidth, pdfHeight);
// //       const pdfBlob = pdf.output('blob');

// //       // Convert the PDF Blob to Base64
// //       const reader2 = new FileReader();
// //       reader2.readAsDataURL(pdfBlob);
// //       const textContent = input.innerText;
        
// //     //   const emailText = `
// //     //   Dear ${payment.user.name},
  
// //     //   Congratulation !! on successfully Booking and We are pleased to confirm your booking at ${paymentData.hotelDetails.name}.
  
// //     //   Booking Details:
// //     //   - Check-in Date: ${payment.date}
// //     //   - Check-out Date: ${payment.date+payment.stayDuration}
// //     //   -
  
// //     //   If you have any questions or need further assistance, please feel free to contact us on email helper23@gmail.com.
  
// //     //   We look forward to welcoming you!
  
// //     //   Best regards,
// //     //   The ${payment.hotelDetails.name} Team
// //     // `;
  
       
// //         const formData = new FormData();
// //         formData.append('to',`israrhusain5892@gmail.com`);
// //         formData.append('subject',`e-Ticket/Hotel Confirmation`);
// //         formData.append('text','hi');
// //         formData.append('attachment', pdfBlob, 'HotelTicket.pdf');
// //         // formData.append('content', textConte nt);
        
// //         try{
// //           const  res=await emailApiCall(formData);
// //            if(res.status===200 || res.status===201){
// //                const message="payemnt done successfully and Hotel ticket has been sent tou your email "+payment.user.email;
// //                 alert('email sent successfully !!')
// //               //  navigate('/hotels',{state:{message}})
// //                 return message;
// //               }
           
// //         }
// //         catch(error){
// //            const message="some thinfg went wrong ";
// //             // navigate('/hotels',{state:{message}})
// //         }
        
// //       }
        
      
      
// // };

//   //   useEffect(() => {
//   //     if (ref) {
//   //       ref.current = {
//   //         downloadTicket: downloadTicket
//   //       };
//   //     }
//   //   }, [ref, downloadTicket]);
//   //   // alert("ticket download succesffuly")
//   // }
//   return (
//     <Document >
//       {/* <Navbar /> */}
//       {/* <p className='text-center  text-xl text-green-800 mt-[-30px]'>Hotel payment donre successfully !! you can download ticket for downloading <button className='text-blue-700 text-xl font-semibold' onClick={downloadTicket}>click here</button></p> */}
//       <Page className=' mx-auto mt-10  w-[800px] border border-gray-300 px-5 py-5 min-h-[800px]' ref={ref}>
//         <Text className='mx-auto text-center font-bold w-full mb-3 text-xl text-yellow-900'>e-Ticket/Hotel</Text>
//         <header className='flex items-center justify-between'>
//           <Text className='flex items-center gap-1'>
//             <img className='w-[60px]' src={logo} alt='logo' />
//             <span className="self-center font-semibold whitespace-nowrap text-white-600 text-base md:text-lg lg:text-2xl">
//               <span className="text-orange-600">Wonders</span>Of<span className="text-green-600">Bharat</span>
//             </span>
//           </Text>
//           <Text className='pr-10 text-xl text-semibold text-yellow-900'>Hotel Confirmation e-ticket</Text>
//         </header>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View>
//         <View className='py-5'>
//           <Text className='text-xl font-bold text-gray-700  ml-5'>Customer Details:</Text>
//           <View className='flex justify-between mt-5 mx-auto w-[600px]'>
//             {/* <h2 className='text-lg'><span className='font-bold text-gray-500'>Customer's Name:</span> {paymentData.user.name}</h2> */}
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Mobile:</span> {payment!=null?payment.user.mobileNumber:''}</h2>
//           </View>

//           <View className='flex justify-between mt-5 mx-auto w-[600px]'>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Email:</span> {payment!=null?payment.user.email:''}</h2>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Pin Code:</span> 265407</h2>
//           </View>

//         </View>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto '></View>

//         {/* Booing eti */}

//         <View className='py-4'>
//           <Text className='text-xl font-bold text-gray-700  ml-5'>Booking Details:</Text>
//           <View className='flex justify-between mt-5 mx-auto w-[600px]'>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Booking Id:</span> {payment!=null?payment.bookingId:''}</h2>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Booking Status:</span> {payment!=null?payment.bookingStatus:''}</h2>
//           </View>

//           <View className='flex justify-between mt-5 mx-auto w-[600px]'>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Stay Duration:</span> {payment!=null?payment.stayDuration:''} days</h2>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Date:</span> {payment!=null?payment.date:''}</h2>
//           </View>

//           <table className='mx-auto border border-gray-700 w-[630px] mt-5 text-center px-5 h-[100px]'>
//             <tr className='px-5 border border-gray-700'>
//               <th className='border border-gray-700 text-gray-500'>Sr No.</th>
//               <th className='border border-gray-700 text-gray-500'>Orer No</th>
//               <th className='border border-gray-700 text-gray-500'>Receipt No.</th>
//               <th className='border border-gray-700 text-gray-500'>Amount</th>

//               <th className='border border-gray-700 text-gray-500'>PaymentStatus</th>
//             </tr>


//             <tr className='border border-gray-700'>
//               <td className='border border-gray-700'>1</td>
//               <td className='border border-gray-700'>{payment!=null?payment.order_id:''}</td>
//               <td className='border border-gray-700'>{payment!=null?payment.receiptNo:''}</td>
//               <td className='border border-gray-700'> ₹ {payment!=null?payment.amount:''}</td>
//               <td className='border border-gray-700  text-[green]'>{payment!=null?payment.paymentStatus:''}</td>
//             </tr>
//           </table>

//         </View>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View>


//         {/* hotel detai */}

//         <View className='py-5'>
//           <Text className='text-xl font-bold text-gray-700  ml-5'>Hotel Details:</Text>
//           <View className='flex justify-between mt-5 mx-auto w-[600px]'>
//             <h2 className='text-xl text-semibold'> {payment!=null ?payment.hotelDetails.name : empty}</h2>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Type:</span> {payment!=null?payment.hotelDetails.type:empty}</h2>
//           </View>

//           <View className='flex justify-between mt-5 mx-auto w-[600px]'>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Address:</span> {payment!=null?payment.hotelDetails.address:empty}</h2>
//             <h2 className='text-lg'><span className='font-bold text-gray-500'>Pin Code:</span> 265407</h2>
//           </View>

//         </View>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View>
//         <View className='px-5 py-5'>
//           <Text className='font-bold text-gray-900'>Important Note: Booked & Payable at Wondersofbharat.com</Text>
//         </View>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View>

//         {/* <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View> */}
//         <View className='px-5 py-5 mt-2'>
//           <Text className='font-bold font-freesans text-gray-900'>Description of Service: Reservation services for accommodation</Text>
//         </View>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View>

//         <View className='px-5 py-5 mt-2'>
//           <Text className='font-bold font-freesans text-gray-900'>Congratulations! You have just booked a Gostays certified hotel from us. This Hotel (Hotel Sai Miracle)
//             has been inspected with an exhaustive check list and certified on delivering a delightful stay.

//           </Text>
//         </View>
//         <View className='w-[95%] h-[1px] bg-yellow-900 mx-auto'></View>
//       </Page>
//       {/* <View className='mx-auto  w-full flex justify-center mt-10'><button onClick={downloadTicket} className='bg-blue-700 px-5 py-3 text-white rounded '>Download Ticket</button></View> */}
//     </Document>
//   );
// })

// export default HotelTicket;
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { collapse } from '@material-tailwind/react';
// import logo from '../logo.png'; // Ensure you have the logo image in your project

const styles = StyleSheet.create({
  page: {
    margin: '10px auto',
    width: '800px',
    border: '1px solid #D1D5DB',
    padding: '20px',
    minHeight: '800px',
    display:'block'
  },
  title: {
    marginBottom: '12px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#B45309',
    // display:'block'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    // display:'block'
  },
  logo: {
    width: '30px',
    // display:'block'
  },
  siteName: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#bbb',
    // display:'block'
  },
  siteNameHighlight: {
    color: '#EA580C',
  },
  siteNameBharat: {
    color: '#059669',
  },
  ticketType: {
    paddingRight: '40px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#B45309',
    // marginRight:'100px'
  },
  separator: {
    width: '95%',
    height: '1px',
    backgroundColor: '#B45309',
    margin: '10px auto',
    display:'block'
  },
  section: {
    padding: '10px',
    // dis?play:'block'
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: '10px',
    // display:'block'
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // gap:'140px',
    marginTop: '20px',
    width: '570px',
    margin: '5px auto',
    // marginLeft:'100px'
    
  },
  detailText: {
    fontSize: '12px',
    // display:'block'
    // opacity:'0.7s'
  },
  detailHighlight: {
    fontWeight: 'bold',
    color: '#6B7280',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px auto',
    width: '500px',
    textAlign: 'center',
    padding: '10px',
    borderCollapse: 'collapse'
   
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    borderWidth: '1px',
    borderColor: '#374151',
    padding: '5px',
    fontSize: '12px',
    // borderStyle: 'solid',
  },
  tableHeader: {
    flex: 1,
    borderWidth: '1px',
    borderColor: '#374151',
    padding: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#6B7280',
    // borderStyle: 'solid',
  },
  importantNote: {
    padding: '20px',
    // fontWeight: 'bold',
    color: '#111827',
    fontSize:'12px'
  },
  description: {
    padding: '20px',
    // fontWeight: 'bold',
    color: '#111827',
    marginTop: '8px',
    // textAlign:'center',
    fontSize:'12px'
    
  },
});

const HotelTicket = ({ ticketId, name, hotel, date, payment }) => {
    //  payment=
    //   {
    //     "id": 22,
    //     "receiptNo": "343nhgegyb",
    //     "order_id": "677767hhyttrt",
    //     "amount": 30000,
    //     "paymentStatus": "Success",
    //     "date": "2024-07-19T10:28:15.104+00:00",
    //     "user": {
    //       "userId": 14,
    //       "name": "imran Husain",
    //       "mobileNumber": "9897876656",
    //       "email": "israrhusain866@gmail.com",
    //       "password": "$2a$10$WAXfUdKVHsd9cI3Fk1caGeHhrEyFA0dCHThLu9EBmlVclmOqA7qM.",
    //       "roles": [
    //         {
    //           "id": 2,
    //           "name": "ROLE_USER"
    //         }
    //       ]
    //     },
    //     "bookingId": "HOTELBKID1",
    //     "bookingStatus": "BOOKED",
    //     "stayDuration": 1,
    //     "hotelDetails": {
    //       "id": 7,
    //       "name": "Hotel Ashokal",
    //       "type": "2 star",
    //       "address": "Station Road, Warangal",
    //       "city": "Warangal",
    //       "state": "Telangana",
    //       "rating": 2,
    //       "price": 20000.0,
    //       "url": "http://localhost:8081/public/hotel/download/7"
    //     }
      
    //  }
  return (<Document>
    <Page style={styles.page}>
      <Text style={styles.title}>e-Ticket/Hotel</Text>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Image style={styles.logo} src={logo} alt="logo" />
          <Text style={styles.siteName}>
            <Text style={styles.siteNameHighlight}>Wonders</Text>Of
            <Text style={styles.siteNameBharat}>Bharat</Text>
          </Text>
        </View>
        <Text style={styles.ticketType}>Hotel Confirmation e-ticket</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Details:</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Name:</Text> {payment!=null? payment.user.name:''}
          </Text>

          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Mobile:</Text> {payment!=null?payment.user.mobileNumber: ''}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Email:</Text> {payment!=null? payment.user.email:''}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Pin Code:</Text> 265407
          </Text>
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details:</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Booking Id:</Text> {payment!=null?payment.bookingId : ''}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Booking Status:</Text> {payment!=null?payment.bookingStatus : ''}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Stay Duration:</Text> {payment!=null ? payment.stayDuration : ''} days
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Date:</Text> {payment!=null?payment.date:''}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Sr No.</Text>
            <Text style={styles.tableHeader}>Order No</Text>
            <Text style={styles.tableHeader}>Receipt No.</Text>
            <Text style={styles.tableHeader}>Amount</Text>
            <Text style={styles.tableHeader}>Payment Status</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>{payment!=null?payment.order_id : ''}</Text>
            <Text style={styles.tableCell}>{payment!=null?payment.receiptNo : ''}</Text>
            <Text style={styles.tableCell}>₹ {payment!=null?payment.amount : ''}</Text>
            <Text style={styles.tableCell}>
              {payment!=null?payment.paymentStatus: ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotel Details:</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>{payment?.hotelDetails?.name || ''}</Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Type:</Text> {payment?.hotelDetails?.type || ''}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Address:</Text> {payment?.hotelDetails?.address || ''}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailHighlight}>Pin Code:</Text> 265407
          </Text>
        </View>
      </View>
      <View style={styles.separator}></View>
      <Text style={styles.importantNote}>Important Note: Booked & Payable at Wondersofbharat.com</Text>
      <View style={styles.separator}></View>
      <Text style={styles.description}>
        Description of Service: Reservation services for accommodation
      </Text>
      <View style={styles.separator}></View>
      <Text style={styles.description}>
        Congratulations! You have just booked a Gostays certified hotel from us. This Hotel has been inspected with an exhaustive check list and certified on delivering a delightful stay.
      </Text>
      <View style={styles.separator}></View>
    </Page>
  </Document>
  
)};
export default HotelTicket;
