"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import with no SSR to avoid hydration issues
const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
});

const GridGlobe = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsMounted(true);
    } catch (error) {
      console.error("Failed to initialize globe:", error);
      setIsError(true);
    }
  }, []);

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  
  const colors = ["#06b6d4", "#3b82f6", "#6366f1", "#f472b6"];
  
  // Render a placeholder during server-side rendering
  // This will be replaced during client-side hydration
  const placeholder = (
    <div className="absolute w-[280px] h-[280px] lg:w-[300px] lg:h-[300px] -top-3 -right-12 lg:-top-10 lg:-right-1 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-full">
      {/* Empty div to prevent hydration mismatch */}
    </div>
  );
  
  // If there's an error, show a fallback UI
  if (isError) {
    return (
      <div className="absolute w-[280px] h-[280px] lg:w-[300px] lg:h-[300px] -top-3 -right-12 lg:-top-10 lg:-right-1 flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-full">
        <span className="text-blue-300 text-sm">3D Globe visualization unavailable</span>
      </div>
    );
  }
  
  // Only render the World component on client side
  if (!isMounted) {
    return placeholder;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute w-[280px] h-[280px] lg:w-[300px] lg:h-[300px] -top-3 -right-12 lg:-top-10 lg:-right-1"
    >
      <World globeConfig={globeConfig} data={generateRandomData(colors)} />
    </motion.div>
  );
};

// Generate reliable data for the globe visualization
function generateRandomData(colors: string[]) {
  try {
    const palette =
      colors && Array.isArray(colors) && colors.length > 0
        ? colors
        : ["#06b6d4", "#3b82f6", "#6366f1", "#f472b6"];
    
    const data = [];
    const numberOfRandomPoints = Math.floor(Math.random() * 8) + 8; // Between 8-15 random routes
    
    // Major cities coordinates to use as realistic points
    const majorCities = [
      { lat: 40.7128, lng: -74.006 },  // New York
      { lat: 51.5074, lng: -0.1278 },  // London
      { lat: 48.8566, lng: 2.3522 },   // Paris
      { lat: 35.6762, lng: 139.6503 }, // Tokyo
      { lat: 22.3193, lng: 114.1694 }, // Hong Kong
      { lat: -33.8688, lng: 151.2093 },// Sydney
      { lat: 19.4326, lng: -99.1332 }, // Mexico City
      { lat: -23.5505, lng: -46.6333 },// São Paulo
      { lat: 55.7558, lng: 37.6173 },  // Moscow
      { lat: 28.6139, lng: 77.209 },   // New Delhi
      { lat: 1.3521, lng: 103.8198 },  // Singapore
      { lat: -34.6037, lng: -58.3816 },// Buenos Aires
      { lat: 37.7749, lng: -122.4194 },// San Francisco
      { lat: 34.0522, lng: -118.2437 },// Los Angeles
      { lat: 41.9028, lng: 12.4964 },  // Rome
      { lat: 52.52, lng: 13.405 },     // Berlin
    ];
    
    // Ensure Portugal (Lisbon) always shows animated activity
    const portugal = { lat: 38.736946, lng: -9.142685 }; // Lisbon
    const portugalPartners = [
      { lat: 40.7128, lng: -74.006 }, // New York
      { lat: 51.5074, lng: -0.1278 }, // London
      { lat: -23.5505, lng: -46.6333 }, // São Paulo
      { lat: 48.8566, lng: 2.3522 }, // Paris
    ];
    
    portugalPartners.forEach((partner, index) => {
      const distance = calculateDistance(
        portugal.lat,
        portugal.lng,
        partner.lat,
        partner.lng
      );
      
      data.push({
        order: index + 1,
        startLat: portugal.lat,
        startLng: portugal.lng,
        endLat: partner.lat,
        endLng: partner.lng,
        arcAlt: Math.min(Math.max(distance / 22000, 0.2), 0.65),
        color: palette[index % palette.length],
      });
    });
    
    for (let i = 0; i < numberOfRandomPoints; i++) {
      // Get two random cities 
      const startCityIndex = Math.floor(Math.random() * majorCities.length);
      let endCityIndex;
      
      // Make sure end city is different from start city
      do {
        endCityIndex = Math.floor(Math.random() * majorCities.length);
      } while (endCityIndex === startCityIndex);
      
      const startCity = majorCities[startCityIndex];
      const endCity = majorCities[endCityIndex];
      
      // Calculate a good arc altitude based on distance
      const distance = calculateDistance(
        startCity.lat, startCity.lng, 
        endCity.lat, endCity.lng
      );
      
      // Arc height proportional to distance, but capped
      const arcAlt = Math.min(Math.max(distance / 15000, 0.1), 0.8);
      
      // Get a random color from the colors array
      const colorIndex = Math.floor(Math.random() * palette.length);
      
      data.push({
        order: Math.floor(Math.random() * 8) + 10, // Random order between 10-18
        startLat: startCity.lat,
        startLng: startCity.lng,
        endLat: endCity.lat,
        endLng: endCity.lng,
        arcAlt: arcAlt,
        color: palette[colorIndex],
      });
    }
    
    return data;
  } catch (error) {
    console.error("Error generating globe data:", error);
    // Return minimal fallback data to prevent rendering errors
    return [
      {
        order: 1,
        startLat: 40.7128,
        startLng: -74.006,
        endLat: 51.5074,
        endLng: -0.1278,
        arcAlt: 0.3,
        color: "#3b82f6"
      }
    ];
  }
}

// Helper function to calculate distance between two points on Earth
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  try {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  } catch (error) {
    console.error("Error calculating distance:", error);
    return 10000; // Return a default distance
  }
}

export default GridGlobe;