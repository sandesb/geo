import { isPointInPolygon } from 'geolib';

// Example geofence polygon coordinates
const geofenceBoundary = [
  { latitude: 27.6698788, longitude: 85.3280281 },
  { latitude: 27.6702000, longitude: 85.3295000 },
  { latitude: 27.6680000, longitude: 85.3299000 },
  { latitude: 27.6685000, longitude: 85.3282000 },
  { latitude: 27.6698788, longitude: 85.3280281 }, // Closing the loop
];

// Check if user location is inside the geofence
export const isUserInsidePolygon = (userLocation) => {
  return isPointInPolygon(userLocation, geofenceBoundary);
};
