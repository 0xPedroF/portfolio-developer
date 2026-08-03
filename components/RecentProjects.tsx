"use client";

import { projects } from "@/data";
import { useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";
import ProjectCarousel from "./ui/ProjectCarousel";

const RecentProjects = () => {
  const commonT = useTranslations("common");

  return (
    <section className="section-gap" id="projects">
      <div className="section-shell space-y-6 sm:space-y-8 md:space-y-10">
        <div className="text-center">
          <SectionTitle
            namespace="projects"
            titleKey="title"
            highlightedWordIndex={1}
          />
        </div>

        <ProjectCarousel
          items={projects}
          viewLabel={commonT("viewProject")}
        />
      </div>
    </section>
  );
};

export default RecentProjects;
