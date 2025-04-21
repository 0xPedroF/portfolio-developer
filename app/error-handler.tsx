'use client';

import { useEffect } from 'react';

export default function ErrorHandler({ children }: { children: React.ReactNode }) {
  // Add global THREE.js error handling
  useEffect(() => {
    // Handle WebGL context loss errors
    const handleError = (event: ErrorEvent) => {
      if (event.error && (
        event.error.toString().includes('WebGLRenderer') || 
        event.error.toString().includes('BufferGeometry') ||
        event.error.toString().includes('NaN')
      )) {
        // Prevent the error from showing in console
        event.preventDefault();
        console.log('THREE.js error caught and handled gracefully');
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  return children;
} 