"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Fog, PerspectiveCamera, Scene, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, useThree, type ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElement<typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const ASPECT = 1.2;
const CAMERA_Z = 300;

export type Position = {
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
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type WorldProps = {
  globeConfig: GlobeConfig;
  data: Position[];
};

type GlobePoint = {
  size: number;
  order: number;
  color: (t: number) => string;
  lat: number;
  lng: number;
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isValidArc = (arc: Position) =>
  isFiniteNumber(arc.startLat) &&
  isFiniteNumber(arc.startLng) &&
  isFiniteNumber(arc.endLat) &&
  isFiniteNumber(arc.endLng) &&
  isFiniteNumber(arc.arcAlt) &&
  Math.abs(arc.startLat) <= 90 &&
  Math.abs(arc.endLat) <= 90 &&
  Math.abs(arc.startLng) <= 180 &&
  Math.abs(arc.endLng) <= 180;

function hexToRgb(hex: string) {
  const normalized = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`
  );
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return null;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function genRandomNumbers(min: number, max: number, count: number) {
  const range = Math.max(max - min, 0);
  const safeCount = Math.min(count, range);
  const values = new Set<number>();
  let attempts = 0;

  while (values.size < safeCount && attempts < safeCount * 8) {
    values.add(Math.floor(Math.random() * range) + min);
    attempts += 1;
  }

  return Array.from(values);
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const [globeData, setGlobeData] = useState<GlobePoint[]>([]);
  const [ready, setReady] = useState(false);

  const defaults = useMemo(
    () => ({
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
    }),
    [globeConfig]
  );

  const validArcs = useMemo(() => data.filter(isValidArc), [data]);

  // Build point data + material once the ThreeGlobe object exists
  useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const init = () => {
      if (cancelled) return;

      const globe = globeRef.current;
      if (!globe) {
        if (tries++ < 60) requestAnimationFrame(init);
        return;
      }

      const material = globe.globeMaterial() as unknown as {
        color: Color;
        emissive: Color;
        emissiveIntensity: number;
        shininess: number;
      };

      material.color = new Color(defaults.globeColor);
      material.emissive = new Color(defaults.emissive);
      material.emissiveIntensity = defaults.emissiveIntensity;
      material.shininess = defaults.shininess;

      const points: GlobePoint[] = [];

      for (const arc of validArcs) {
        const rgb = hexToRgb(arc.color.startsWith("#") ? arc.color : "#38bdf8");
        if (!rgb) continue;

        const colorFn = (t: number) =>
          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`;

        points.push({
          size: defaults.pointSize,
          order: arc.order,
          color: colorFn,
          lat: arc.startLat,
          lng: arc.startLng,
        });
        points.push({
          size: defaults.pointSize,
          order: arc.order,
          color: colorFn,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }

      const uniquePoints = points.filter(
        (point, index, all) =>
          all.findIndex((p) => p.lat === point.lat && p.lng === point.lng) ===
          index
      );

      setGlobeData(uniquePoints);
      setReady(true);
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [validArcs, defaults]);

  // Configure globe layers (hex countries, arcs, points, rings)
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;

    globe
      .hexPolygonsData((countries as { features: object[] }).features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaults.showAtmosphere)
      .atmosphereColor(defaults.atmosphereColor)
      .atmosphereAltitude(defaults.atmosphereAltitude)
      .hexPolygonColor(() => defaults.polygonColor);

    if (validArcs.length > 0) {
      globe
        .arcsData(validArcs)
        .arcStartLat((d: object) => (d as Position).startLat)
        .arcStartLng((d: object) => (d as Position).startLng)
        .arcEndLat((d: object) => (d as Position).endLat)
        .arcEndLng((d: object) => (d as Position).endLng)
        .arcColor((d: object) => (d as Position).color)
        .arcAltitude((d: object) => (d as Position).arcAlt)
        .arcStroke(0.32)
        .arcDashLength(defaults.arcLength)
        .arcDashInitialGap((d: object) => (d as Position).order)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaults.arcTime);
    }

    if (globeData.length > 0) {
      // Use lat/lng points — raw arcs lack those fields and produce NaN positions
      globe
        .pointsData(globeData)
        .pointLat((d: object) => (d as GlobePoint).lat)
        .pointLng((d: object) => (d as GlobePoint).lng)
        .pointColor((d: object) => (d as GlobePoint).color(0))
        .pointsMerge(true)
        .pointAltitude(0)
        .pointRadius(Math.max(defaults.pointSize / 2, 1.5));
    }

    globe
      .ringsData([])
      .ringColor((d: object) => (t: number) => (d as GlobePoint).color(t))
      .ringMaxRadius(defaults.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaults.arcTime * defaults.arcLength) / defaults.rings
      );
  }, [ready, globeData, validArcs, defaults]);

  // Pulse rings on a subset of points (Aceternity pattern)
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || globeData.length === 0) return;

    const interval = setInterval(() => {
      const max = Math.min(globeData.length, 12);
      const indices = genRandomNumbers(0, max, Math.floor((max * 4) / 5));
      const rings = globeData.filter((_, index) => indices.includes(index));
      if (rings.length > 0) {
        globe.ringsData(rings);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [globeData]);

  return <threeGlobe ref={globeRef} />;
}

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
  }, [gl, size]);

  return null;
}

function GlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10">
      <span className="text-sm text-white/70">Globe unavailable</span>
    </div>
  );
}

export function World({ globeConfig, data }: WorldProps) {
  const [hasError, setHasError] = useState(false);

  const scene = useMemo(() => {
    const nextScene = new Scene();
    nextScene.fog = new Fog(0xffffff, 400, 2000);
    return nextScene;
  }, []);

  const camera = useMemo(
    () => new PerspectiveCamera(50, ASPECT, 180, 1800),
    []
  );

  if (hasError) return <GlobeFallback />;

  return (
    <ErrorBoundary fallback={<GlobeFallback />} onError={() => setHasError(true)}>
      <Canvas scene={scene} camera={camera} dpr={[1, 1.5]}>
        <WebGLRendererConfig />
        <ambientLight
          color={globeConfig.ambientLight || "#38bdf8"}
          intensity={0.6}
        />
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
        <Globe globeConfig={globeConfig} data={data} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={CAMERA_Z}
          maxDistance={CAMERA_Z}
          autoRotate={globeConfig.autoRotate ?? true}
          autoRotateSpeed={globeConfig.autoRotateSpeed ?? 0.5}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </ErrorBoundary>
  );
}
