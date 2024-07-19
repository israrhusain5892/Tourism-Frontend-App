import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
function HotelTicketPage({payment}) {

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#E4E4E4',
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1,
        },
      });
    return (
        <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Hotel Ticket</Text>
            <Text>Ticket ID: iii889999</Text>
            <Text>Name: {payment.user.name}</Text>
            <Text>Hotel: hotel</Text>
            <Text>Date: {payment.date}</Text>
          </View>
        </Page>
      </Document>
    );
}

export default HotelTicketPage;