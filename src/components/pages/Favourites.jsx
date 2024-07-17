import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer'

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
    }, []);

    const handleRemoveFromFavourites = (tripId) => {
        const updatedFavourites = favourites.filter(fav => fav.tripId !== tripId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    return (
        <>
            <Navbar />
            <div className="p-4 mt-20 mb-8">
                <h2 className="text-2xl font-bold mb-8 text-center text-[#600180]">My Favourites</h2>
                {favourites.length === 0 ? (
                    <p className="text-center text-[#600180]">No favourites yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-center">
                        {favourites.map(trip => (
                            <div key={trip.tripId} className="w-full sm:w-64 shadow-lg rounded-lg overflow-hidden bg-white transition-transform duration-300 hover:shadow-[#600180] hover:rounded-md hover:scale-110 cursor-pointer">
                                <div className="relative w-full h-40">
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                        <div className="flex-col gap-4 w-full flex items-center justify-center">
                                            <div className="w-20 h-20 border-8 text-[#600180] text-4xl animate-spin border-[#600180] border-opacity-50 flex items-center justify-center border-t-gray-300 rounded-full">
                                                <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
                                                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <img
                                                src={trip.url}
                                                alt={trip.tripName}
                                                className="absolute inset-0 w-full h-full object-cover overflow-hidden transition-transform duration-300 transform hover:scale-110"
                                                onLoad={(e) => e.target.style.display = 'block'}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg text-[#600180] font-bold mb-2">{trip.tripName}</h3>
                                    <p className="text-[#600180] text-opacity-70 mb-2">{trip.tripAddress}</p>
                                    <p className="text-[#600180]">{trip.stateName}</p>
                                    <p className="text-[#600180]">{trip.categoryName}</p>
                                    <button
                                        onClick={() => handleRemoveFromFavourites(trip.tripId)}
                                        className="mt-2 px-4 py-2 border rounded-md transition-colors duration-200 bg-gray-200 text-[#600180] hover:bg-gray-300"
                                    >
                                        Remove from Favourites
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>

    );
};

export default Favourites;
