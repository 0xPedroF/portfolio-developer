"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import QuickContactFab from "@/components/ui/QuickContactFab";
import { navItems } from "@/data";

const Grid = dynamic(() => import("@/components/Grid"), {
  loading: () => (
    <section id="about" className="section-gap" aria-hidden>
      <div className="section-shell h-[420px] sm:h-[500px]" />
    </section>
  ),
});

const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
  loading: () => (
    <section id="projects" className="section-gap" aria-hidden>
      <div className="section-shell flex h-[360px] items-center justify-center text-white/50 sm:h-[420px]">
        Loading projects...
      </div>
    </section>
  ),
});

const ClientProjects = dynamic(() => import("@/components/ClientProjects"), {
  loading: () => (
    <section id="clientProjects" className="section-gap" aria-hidden>
      <div className="section-shell flex h-[360px] items-center justify-center text-white/50 sm:h-[420px]">
        Loading client projects...
      </div>
    </section>
  ),
});

const Clients = dynamic(() => import("@/components/Clients"));
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <section id="experience" className="section-gap" aria-hidden>
      <div className="section-shell h-[360px]" />
    </section>
  ),
});
const Approach = dynamic(() => import("@/components/Approach"));
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <footer id="contact" className="section-gap" aria-hidden>
      <div className="section-shell h-[240px]" />
    </footer>
  ),
});

export default function Home() {
  return (
    <>
      <main className="relative isolate flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-transparent px-3 pb-28 pt-[var(--nav-height)] sm:px-6 sm:pb-24 md:px-10 lg:px-12">
        <div className="pointer-events-none absolute -top-64 right-[-10%] hidden h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sky-500/25 via-indigo-500/15 to-transparent blur-[140px] sm:block" />
        <div className="pointer-events-none absolute top-32 left-[-20%] hidden h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-400/20 via-teal-500/10 to-transparent blur-[120px] sm:block" />
        <div className="pointer-events-none absolute inset-0 opacity-40 sm:opacity-50">
          <div className="grid-overlay" />
        </div>
        <div className="relative z-10 w-full max-w-6xl space-y-1 xl:max-w-7xl">
          <FloatingNav navItems={navItems} />
          <Hero />
          <Grid />
          <RecentProjects />
          <ClientProjects />
          <Clients />
          <Experience />
          <Approach />
          <Footer />
        </div>
      </main>
      <QuickContactFab />
    </>
  );
}
