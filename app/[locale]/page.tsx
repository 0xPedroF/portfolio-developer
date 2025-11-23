import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import QuickContactFab from "@/components/ui/QuickContactFab";
import { navItems } from "@/data";
import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from 'next-intl';

// Dynamic import for components not needed for initial render
const RecentProjects = dynamic(() => import("@/components/RecentProjects"), { 
  loading: () => <div className="h-[500px] flex justify-center items-center">Loading projects...</div>,
  ssr: true
});

const ClientProjects = dynamic(() => import("@/components/ClientProjects"), {
  loading: () => <div className="h-[500px] flex justify-center items-center">Loading client projects...</div>,
  ssr: true
});

const Clients = dynamic(() => import("@/components/Clients"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Approach = dynamic(() => import("@/components/Approach"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  const locale = useLocale();
  
  return (
    <>
      <main className="relative isolate flex min-h-screen w-full flex-col items-center overflow-hidden bg-transparent px-4 pb-24 pt-10 sm:px-8 md:px-10 lg:px-12">
        <div className="pointer-events-none absolute -top-64 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-transparent blur-[140px]" />
        <div className="pointer-events-none absolute top-32 left-[-20%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-sky-400/25 via-cyan-500/10 to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="grid-overlay" />
        </div>
        <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl">
          <FloatingNav navItems={navItems} />
          <Hero />
          <Grid />
          <Suspense fallback={<div className="h-[500px] flex justify-center items-center">Loading projects...</div>}>
            <RecentProjects />
          </Suspense>
          <Suspense fallback={<div className="h-[500px] flex justify-center items-center">Loading client projects...</div>}>
            <ClientProjects />
          </Suspense>
          <Suspense fallback={<div className="h-[300px]"></div>}>
            <Clients />
          </Suspense>
          <Suspense fallback={<div className="h-[400px]"></div>}>
            <Experience />
          </Suspense>
          <Suspense fallback={<div className="h-[400px]"></div>}>
            <Approach />
          </Suspense>
          <Suspense fallback={<div className="h-[200px]"></div>}>
            <Footer />
          </Suspense>
        </div>
      </main>
      <QuickContactFab />
    </>
  );
}