"use client";

import { clientProjects } from "@/data";
import { useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";
import ProjectCarousel from "./ui/ProjectCarousel";

const ClientProjects = () => {
  const commonT = useTranslations("common");

  return (
    <section className="section-gap" id="clientProjects">
      <div className="section-shell space-y-6 sm:space-y-8 md:space-y-10">
        <div className="text-center">
          <SectionTitle
            namespace="clients"
            titleKey="title"
            highlightedWordIndex={0}
          />
        </div>

        <ProjectCarousel
          items={clientProjects}
          viewLabel={commonT("viewProject")}
        />
      </div>
    </section>
  );
};

export default ClientProjects;
