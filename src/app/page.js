'use client';

import { useGeofence } from './utils/geofence';
import Confetti from 'confetti-react';
import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

export default function GeoFenceApp() {
  const { insideGeofence, loading } = useGeofence();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Get the birthday message and YouTube link from environment variables
  const birthdayMessage = process.env.NEXT_PUBLIC_BIRTHDAY_MESSAGE || 'Happy Birthday!';
  const youtubeLink = process.env.NEXT_PUBLIC_YOUTUBE_LINK || 'https://www.youtube.com';

  useEffect(() => {
    // Trigger confetti when inside geofence
    if (insideGeofence) {
      setShowConfetti(true);

      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [insideGeofence]);

  if (loading) {
    return <p className="text-center text-lg font-semibold text-gray-900">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-purple-200 p-4 text-gray-800">
      {showConfetti && <Confetti width={width} height={height} />}
      <h1 className="text-4xl font-extrabold text-gray-50 bg-gradient-to-r from-purple-300 via-blue-300 to-purple-200 px-6 py-2 rounded-full shadow-lg">
        Happy Wonday
      </h1>
      {insideGeofence ? (
        <div className="mt-8 bg-gray-100 shadow-md rounded-lg p-6 text-center max-w-md">
          <img src="/bday.gif" alt="Happy Birthday" className="mx-auto mb-4" />
          <h3 className="text-3xl font-extrabold text-pink-400 mb-4">Happy Birthday!</h3>
          <p className="text-lg text-gray-700">{birthdayMessage}</p>
          <button
            className="text-2xl font-bold text-blue-400 mb-2 cursor-pointer hover:underline"
            onClick={() => window.open(youtubeLink, '_blank')}
          >
            Timro Gift 👉🎁 (Click)
          </button>
        </div>
      ) : (
        <div className="mt-8 bg-white shadow-md rounded-lg p-6 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oho!</h2>
          <p className="text-lg text-gray-700">
            Timi ghar pugekai chainau raicha. Go Home and Try Again hehe!
          </p>
        </div>
      )}
    </div>
  );
}
