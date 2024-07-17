// Loader.js
import React from 'react';
import '../App.css'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="loader mb-4"></div>
      
    </div>
  );
};

export default Loader;
