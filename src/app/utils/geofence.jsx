'use client';

import { useState, useEffect } from 'react';
import { isPointInPolygon } from 'geolib';

// Load geofence boundary from environment variable
let geofenceBoundary;
try {
  geofenceBoundary = JSON.parse(process.env.NEXT_PUBLIC_GEOFENCE_BOUNDARY || '[]');
} catch (error) {
  console.error('Failed to parse geofence boundary from environment variable:', error);
  geofenceBoundary = [];
}

export const useGeofence = () => {
  const [insideGeofence, setInsideGeofence] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Check if the user is inside the geofence
          if (geofenceBoundary.length && isPointInPolygon(userLocation, geofenceBoundary)) {
            setInsideGeofence(true);
          } else {
            setInsideGeofence(false);
          }

          setLoading(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  return { insideGeofence, loading };
};
