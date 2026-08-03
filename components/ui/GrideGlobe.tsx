"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { GlobeConfig, Position } from "./Globe";

/**
 * GitHub-style globe wrapper (Aceternity UI pattern).
 * @see https://ui.aceternity.com/components/github-globe
 */
const World = dynamic(() => import("./Globe").then((mod) => mod.World), {
  ssr: false,
  loading: () => <GlobeShell />,
});

const COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#38bdf8"] as const;

/** Stable arc set — no Math.random on render (avoids remount thrash + NaN risk). */
const SAMPLE_ARCS: Position[] = [
  // Lisbon hub — portfolio owner base
  {
    order: 1,
    startLat: 38.7223,
    startLng: -9.1393,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.35,
    color: COLORS[0],
  },
  {
    order: 1,
    startLat: 38.7223,
    startLng: -9.1393,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.2,
    color: COLORS[1],
  },
  {
    order: 1,
    startLat: 38.7223,
    startLng: -9.1393,
    endLat: -23.5505,
    endLng: -46.6333,
    arcAlt: 0.45,
    color: COLORS[2],
  },
  {
    order: 2,
    startLat: 38.7223,
    startLng: -9.1393,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.15,
    color: COLORS[3],
  },
  // Global connections (Aceternity demo style)
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: COLORS[0],
  },
  {
    order: 3,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: COLORS[1],
  },
  {
    order: 3,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.35,
    color: COLORS[2],
  },
  {
    order: 4,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: COLORS[3],
  },
  {
    order: 4,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.4,
    color: COLORS[0],
  },
  {
    order: 5,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.55,
    color: COLORS[1],
  },
  {
    order: 5,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.45,
    color: COLORS[2],
  },
  {
    order: 6,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.35,
    color: COLORS[3],
  },
  {
    order: 6,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.4,
    color: COLORS[0],
  },
  {
    order: 7,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.35,
    color: COLORS[1],
  },
  {
    order: 7,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.25,
    color: COLORS[2],
  },
  {
    order: 8,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.4,
    color: COLORS[3],
  },
];

const globeConfig: GlobeConfig = {
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
  initialPosition: { lat: 38.7223, lng: -9.1393 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

function GlobeShell() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20" />
  );
}

const GridGlobe = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full"
    >
      <World globeConfig={globeConfig} data={SAMPLE_ARCS} />
    </motion.div>
  );
};

export default GridGlobe;
