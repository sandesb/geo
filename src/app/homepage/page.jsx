'use client';

import { isPointInPolygon } from 'geolib';
import { useState, useEffect } from 'react';

// Geofence polygon boundary coordinates (Patan Sundhara example)
const geofenceBoundary = [
    { latitude: 27.670217863471777, longitude: 85.33126070180549 },
    { latitude: 27.67033489402604, longitude: 85.32974656152294 },
    { latitude: 27.66956931687467, longitude: 85.32999983589679 },
    { latitude: 27.669271861885633, longitude: 85.33135430320539 },
    { latitude: 27.670276378765067, longitude: 85.3312662077704 },
    { latitude: 27.670193482090085, longitude: 85.33127721970033 },
  ];
  

// Function to check if the user is inside the geofence
const isUserInsidePolygon = (userLocation) => {
  return isPointInPolygon(userLocation, geofenceBoundary);
};

export default function GeoFenceApp() {
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the browser supports geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Save user's exact coordinates
          setCoordinates(userLocation);

          // Check if the user is inside the geofence
          if (isUserInsidePolygon(userLocation)) {
            setMessage('Welcome to Patan Sundhara! 🎉 You are inside the geofence.');
          } else {
            setMessage('You are outside the geofence. Please visit Patan Sundhara!');
          }

          setLoading(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setMessage('Unable to fetch location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setMessage('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">GeoFence App</h1>
      {coordinates && (
        <div className="mb-4">
          <p>Your current coordinates:</p>
          <p>
            <strong>Latitude:</strong> {coordinates.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {coordinates.longitude}
          </p>
        </div>
      )}
      <p className="text-lg">{message}</p>
    </div>
  );
}
