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
      <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
        <div className="max-w-7xl w-full">
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