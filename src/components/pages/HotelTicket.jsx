
import logo from '../assets/logo2.png';

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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
