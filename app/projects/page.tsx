"use client";
import { projects } from "@/data/projects";
import { useApp } from "@/components/provider";
import { SectionHeading } from "@/components/home";
export default function Page() {
  const { t, locale, openModal } = useApp();
  return (
    <main className="container page-content">
      <SectionHeading title={t("projects")} />
      <div className="portfolio-grid projects-page">
        {projects.map((p) => (
          <button
            key={p.id}
            className="portfolio-item"
            onClick={() =>
              openModal({
                type: "projectDetail",
                title: p.name[locale],
                image: p.image,
                id: p.professionalId,
              })
            }
          >
            <img src={p.image} alt={p.name[locale]} />
            <strong>{p.name[locale]}</strong>
          </button>
        ))}
      </div>
    </main>
  );
}
