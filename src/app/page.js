'use client';

import { useState, useEffect } from 'react';
import { isPointInPolygon } from 'geolib';

// Updated geofence coordinates
const geofenceBoundary = [
  { latitude: 27.679123687898837, longitude: 85.31682570790417 },
  { latitude: 27.6775677187386, longitude: 85.32144836253451 },
  { latitude: 27.675483796750967, longitude: 85.32113460769529 },
  { latitude: 27.67436309337741, longitude: 85.32070580941524 },
  { latitude: 27.677086104744888, longitude: 85.31629232467839 },
  { latitude: 27.679105164586787, longitude: 85.31684662489454 },
];

export default function GeoFenceApp() {
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [insideGeofence, setInsideGeofence] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setCoordinates(userLocation);

          if (isPointInPolygon(userLocation, geofenceBoundary)) {
            setMessage('Welcome, Home! 🎉 You got rickrolled.');
            setInsideGeofence(true);

          } else {
            setMessage('You are outside the geofence. Please go home!');
            setInsideGeofence(false);

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
      {insideGeofence && (
        <img src="/rick.gif" alt="Rick Roll" className="mt-4" />
      )}    </div>
  );
}
