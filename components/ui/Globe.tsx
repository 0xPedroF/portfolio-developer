"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
import { ErrorBoundary } from "react-error-boundary";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Safe initialization to avoid errors during component mount
  useEffect(() => {
    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      if (globeRef.current) {
        try {
          _buildData();
          _buildMaterial();
          setIsInitialized(true);
        } catch (error) {
          console.error('Error initializing globe:', error);
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [globeRef.current]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    try {
      const globeMaterial = globeRef.current.globeMaterial() as unknown as {
        color: Color;
        emissive: Color;
        emissiveIntensity: number;
        shininess: number;
      };
      
      if (globeMaterial) {
        globeMaterial.color = new Color(globeConfig.globeColor || "#1d072e");
        globeMaterial.emissive = new Color(globeConfig.emissive || "#000000");
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
      }
    } catch (error) {
      console.error('Error setting globe material:', error);
    }
  };

  const _buildData = () => {
    try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        setGlobeData([]);
        return;
      }
      
      const arcs = data;
      let points = [];
      
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        if (!arc) continue;
        
        // Ensure color is a valid hex string
        if (!arc.color || typeof arc.color !== 'string' || !arc.color.startsWith('#')) {
          arc.color = '#3b82f6'; // Default fallback color
        }
        
        const rgb = hexToRgb(arc.color);
        if (!rgb) continue;
        
        // Validate coordinates
        if (isNaN(arc.startLat) || isNaN(arc.startLng) || isNaN(arc.endLat) || isNaN(arc.endLng)) {
          continue;
        }
        
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          lat: arc.startLat,
          lng: arc.startLng,
        });
        
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }

      // remove duplicates for same lat and lng
      const filteredPoints = points.filter(
        (v, i, a) =>
          a.findIndex((v2) =>
            ["lat", "lng"].every(
              (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
            )
          ) === i
      );

      // Validate all data points to ensure there are no NaN values
      const validData = filteredPoints.filter(d => {
        // Check if any coordinate is NaN or invalid
        const hasNaN = isNaN(d.lat) || isNaN(d.lng) || isNaN(d.arcAlt);
        
        // Check if values are in valid ranges
        const validLatRange = Math.abs(d.lat) <= 90;
        const validLngRange = Math.abs(d.lng) <= 180;
        const validArc = d.arcAlt > 0 && d.arcAlt < 5; // Reasonable arc altitude range
        
        return !hasNaN && validLatRange && validLngRange && validArc;
      });

      if (validData.length === 0) {
        console.warn("No valid globe data points found after validation");
        setGlobeData([]);
        return;
      }

      setGlobeData(validData);
    } catch (error) {
      console.error('Error building data:', error);
      setGlobeData([]);
    }
  };

  useEffect(() => {
    if (!globeRef.current || !globeData || !isInitialized) return;

    try {
      // Safe timeout to ensure the DOM is ready
      const timer = setTimeout(() => {
        if (!globeRef.current) return;
        
        globeRef.current
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.7)
          .showAtmosphere(defaultProps.showAtmosphere)
          .atmosphereColor(defaultProps.atmosphereColor)
          .atmosphereAltitude(defaultProps.atmosphereAltitude)
          .hexPolygonColor(() => defaultProps.polygonColor);
          
        startAnimation();
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  }, [globeData, isInitialized]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    try {
      // Only set arc data if we have valid data
      if (data && data.length > 0) {
        globeRef.current
          .arcsData(data)
          .arcStartLat((d) => ((d as { startLat: number })?.startLat || 0) * 1)
          .arcStartLng((d) => ((d as { startLng: number })?.startLng || 0) * 1)
          .arcEndLat((d) => ((d as { endLat: number })?.endLat || 0) * 1)
          .arcEndLng((d) => ((d as { endLng: number })?.endLng || 0) * 1)
          .arcColor((e: any) => (e as { color: string })?.color || '#ffffff')
          .arcAltitude((e) => (e as { arcAlt: number })?.arcAlt * 1 || 0.1)
          .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
          .arcDashLength(defaultProps.arcLength)
          .arcDashInitialGap((e) => ((e as { order: number })?.order || 0) * 1)
          .arcDashGap(15)
          .arcDashAnimateTime(() => defaultProps.arcTime);

        // Only set point data if we have valid globe data
        if (globeData.length > 0) {
          globeRef.current
            .pointsData(data)
            .pointColor((e) => (e as { color: string })?.color || '#ffffff')
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2);
        }

        globeRef.current
          .ringsData([])
          .ringColor((e: any) => (t: any) => e.color ? e.color(t) : '#ffffff')
          .ringMaxRadius(defaultProps.maxRings)
          .ringPropagationSpeed(RING_PROPAGATION_SPEED)
          .ringRepeatPeriod(
            (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
          );
      }
    } catch (error) {
      console.error('Error in animation:', error);
    }
  };

  useEffect(() => {
    if (!globeRef.current || !globeData || !isInitialized) return;

    // Timeout to ensure initial animation has started
    const initialTimer = setTimeout(() => {
      let interval: NodeJS.Timeout;
      
      try {
        interval = setInterval(() => {
          if (!globeRef.current || !globeData) return;
          
          try {
            if (data.length > 0) {
              const max = Math.min(data.length, 10); // Limit to prevent errors
              numbersOfRings = genRandomNumbers(
                0,
                max,
                Math.floor((max * 4) / 5)
              );

              if (globeRef.current && globeData.length > 0) {
                const ringsData = globeData.filter((d, i) => i < max && numbersOfRings.includes(i));
                if (ringsData && ringsData.length > 0) {
                  globeRef.current.ringsData(ringsData);
                }
              }
            }
          } catch (error) {
            console.error('Error updating rings:', error);
          }
        }, 2000);
      } catch (error) {
        console.error('Error setting up ring interval:', error);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [globeRef.current, globeData, isInitialized]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    try {
      // Add context restoration handling
      const handleContextLost = (event) => {
        event.preventDefault();
        console.log('WebGL context lost - attempting to handle gracefully');
      };
      
      const handleContextRestored = () => {
        console.log('WebGL context restored');
        // Reinitialize if needed
        gl.setPixelRatio(window.devicePixelRatio || 1);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0x000000, 0);
      };
      
      // Get the canvas element and add event listeners
      const canvas = gl.domElement;
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
      
      // Initial setup
      gl.setPixelRatio(window.devicePixelRatio || 1);
      gl.setSize(size.width, size.height);
      gl.setClearColor(0x000000, 0);
      
      // Handle potential power saving modes
      gl.powerPreference = "high-performance";
      
      return () => {
        // Clean up event listeners on unmount
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    } catch (error) {
      console.error('Error configuring WebGL renderer:', error);
    }
  }, [gl, size]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const [hasError, setHasError] = useState(false);
  
  // Create the scene outside of the render function to avoid recreation
  const scene = useMemo(() => {
    try {
      const newScene = new Scene();
      newScene.fog = new Fog(0xffffff, 400, 2000);
      return newScene;
    } catch (error) {
      console.error('Error creating scene:', error);
      setHasError(true);
      return new Scene();
    }
  }, []);
  
  // Create camera with proper parameters
  const camera = useMemo(() => {
    try {
      return new PerspectiveCamera(50, aspect, 180, 1800);
    } catch (error) {
      console.error('Error creating camera:', error);
      setHasError(true);
      return new PerspectiveCamera(50, 1, 1, 1000);
    }
  }, []);
  
  // Simple fallback component for errors
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
        <span className="text-sm text-white/70">Globe visualization unavailable</span>
      </div>
    );
  }
  
  return (
    <ErrorBoundary 
      fallback={
        <div className="w-full h-full flex items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
          <span className="text-sm text-white/70">Globe visualization unavailable</span>
        </div>
      }
      onError={() => setHasError(true)}
    >
      <Canvas 
        scene={scene} 
        camera={camera}
        onCreated={({ gl }) => {
          try {
            gl.setClearColor(0x000000, 0);
            // Set performance hints
            gl.powerPreference = "high-performance";
            // Disable depth test for transparent objects
            gl.clearDepth(1.0);
          } catch (error) {
            console.error('Error on canvas creation:', error);
            setHasError(true);
          }
        }}
        // Use pixel ratio of 1 for better performance
        dpr={[1, 1.5]}
      >
        <WebGLRendererConfig />
        <ambientLight color={globeConfig.ambientLight || "#38bdf8"} intensity={0.6} />
        <directionalLight
          color={globeConfig.directionalLeftLight || "#ffffff"}
          position={new Vector3(-400, 100, 400)}
        />
        <directionalLight
          color={globeConfig.directionalTopLight || "#ffffff"}
          position={new Vector3(-200, 500, 200)}
        />
        <pointLight
          color={globeConfig.pointLight || "#ffffff"}
          position={new Vector3(-200, 500, 200)}
          intensity={0.8}
        />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={cameraZ}
          maxDistance={cameraZ}
          autoRotateSpeed={1}
          autoRotate={true}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </ErrorBoundary>
  );
}

export function hexToRgb(hex: string) {
  try {
    if (!hex) return null;
    
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  } catch (error) {
    console.error('Error converting hex to RGB:', error);
    return null;
  }
}

export function genRandomNumbers(min: number, max: number, count: number) {
  try {
    // Ensure parameters are valid
    if (isNaN(min) || isNaN(max) || isNaN(count)) {
      console.error('Invalid parameters for genRandomNumbers');
      return [];
    }
    
    // Ensure count is not greater than possible range
    const possibleRange = max - min;
    const safeCount = Math.min(count, possibleRange);
    
    const arr = [];
    let attempts = 0;
    const maxAttempts = safeCount * 3; // Prevent infinite loops
    
    while (arr.length < safeCount && attempts < maxAttempts) {
      const r = Math.floor(Math.random() * possibleRange) + min;
      if (arr.indexOf(r) === -1) arr.push(r);
      attempts++;
    }

    return arr;
  } catch (error) {
    console.error('Error generating random numbers:', error);
    return [];
  }
}