import React, { createContext, useRef, useState } from 'react';

export const TicketContext = createContext();

export const ContextProvider = ({ children }) => {
  const ticketRef = useRef();
  const [payment, setPayment] = useState(null);

  return (
    <TicketContext.Provider value={{ ticketRef, payment, setPayment }}>
      {children}
    </TicketContext.Provider>
  );
};