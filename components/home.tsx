"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  Users,
  FileText,
  Star,
  MapPin,
  House,
  Layers,
  Check,
  CheckCircle2,
  ListChecks,
  Send,
} from "lucide-react";
import { useApp } from "./provider";
import {
  categories,
  locations,
  projectTypes,
  budgets,
} from "@/data/categories";
import { professionals } from "@/data/professionals";
import { projects } from "@/data/projects";
import { CategoryIcon, ProfessionalCard, Stars } from "./ui";
export function QuickSearch() {
  const { t, locale } = useApp();
  const router = useRouter();
  const [cat, setCat] = useState("architecture");
  const [type, setType] = useState("house");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  return (
    <div className="quick-search-wrap">
      <form
        className="quick-search"
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          if (cat) params.set("category", cat);
          if (type) params.set("type", type);
          if (location)
            params.set(
              "location",
              locations.find(
                (l) => l.name[locale].toLowerCase() === location.toLowerCase(),
              )?.id || location,
            );
          if (budget) params.set("budget", budget);
          router.push(`/search?${params}`);
        }}
      >
        <label>
          <CategoryIcon id={cat} />
          <span>
            <small>{t("need")}</small>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              aria-label={t("need")}
            >
              <option value="">{t("any")}</option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.profession[locale]}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <House size={22} />
          <span>
            <small>{t("projectType")}</small>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label={t("projectType")}
            >
              <option value="">{t("any")}</option>
              {projectTypes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name[locale]}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <MapPin size={22} />
          <span>
            <small>{t("location")}</small>
            <input
              list="location-suggestions"
              placeholder={locations[0].name[locale]}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label={t("location")}
            />
            <datalist id="location-suggestions">
              {locations.map((l) => (
                <option key={l.id} value={l.name[locale]} />
              ))}
            </datalist>
          </span>
        </label>
        <label>
          <Layers size={22} />
          <span>
            <small>{t("budget")}</small>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              aria-label={t("budget")}
            >
              <option value="">{t("any")}</option>
              {budgets.map((b) => (
                <option value={b.id} key={b.id}>
                  {b.name}/m²
                </option>
              ))}
            </select>
          </span>
        </label>
        <button className="button search-submit">
          <Search size={20} />
          {t("search")}
        </button>
      </form>
      <div className="popular-services">
        <strong>{t("popularServices")}</strong>
        {categories.slice(0, 6).map((c) => (
          <Link key={c.id} href={`/search?category=${c.id}`}>
            {c.profession[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
export function Pricing({ standalone = false }: { standalone?: boolean }) {
  const { t, openModal } = useApp();
  const plans = [
    {
      name: "FREE",
      price: "0₾",
      features: ["basicProfile", "fiveProjects", "basicSearch"],
    },
    {
      name: "PRO",
      price: "29–39₾",
      features: [
        "biggerPortfolio",
        "betterSearch",
        "analytics",
        "notifications",
        "verification",
      ],
    },
    {
      name: "BUSINESS",
      price: "79–129₾",
      features: [
        "companyPage",
        "teamMembers",
        "unlimited",
        "advancedAnalytics",
        "priority",
        "moreLeads",
      ],
    },
  ];
  return (
    <section
      className={`pricing-section ${standalone ? "standalone-pricing" : ""}`}
      id="pricing"
    >
      <div className="pricing-intro">
        <span className="eyebrow">SHENEBA.GE</span>
        <h2>{t("growTitle")}</h2>
        <p>{t("growText")}</p>
        <Link href={standalone ? "/search" : "/pricing"}>
          {t("learnMore")} <ArrowRight size={16} />
        </Link>
      </div>
      {plans.map((p, i) => (
        <article
          key={p.name}
          className={`price-card ${i === 1 ? "popular-plan" : ""}`}
        >
          {i === 1 && <span className="popular-badge">{t("popular")}</span>}
          <span className="plan-name">{p.name}</span>
          <h3>
            {i === 0 ? t("free") : p.price}
            <small>{i === 0 ? "0₾" : ` / ${t("month")}`}</small>
          </h3>
          <ul>
            {p.features.map((f) => (
              <li key={f}>
                <Check size={15} />
                {t(f)}
              </li>
            ))}
          </ul>
          <button
            className={`button ${i !== 1 ? "outline" : ""}`}
            onClick={() => openModal({ type: "plan", title: p.name })}
          >
            {i === 0 ? t("register") : `${t("choose")} ${p.name}`}
          </button>
        </article>
      ))}
    </section>
  );
}
export function Home() {
  const { t, locale, openModal } = useApp();
  return (
    <main>
      <section className="hero">
        <img className="hero-image" src="/images/hero.png" alt="" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="hero-eyebrow">{t("heroEyebrow")}</span>
          <h1>{t("heroTitle")}</h1>
          <p>{t("heroText")}</p>
          <div className="hero-actions">
            <Link href="/search" className="button">
              {t("findProfessional")}
              <ArrowRight size={17} />
            </Link>
            <button
              className="button white"
              onClick={() => openModal({ type: "project" })}
            >
              {t("postProject")}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
      <div className="container home-content">
        <QuickSearch />
        <section className="stats-row">
          {[
            {
              icon: Users,
              n: "500+",
              title: "professionalsStat",
              desc: "verifiedStat",
            },
            {
              icon: FileText,
              n: "1200+",
              title: "projectsStat",
              desc: "realProjects",
            },
            {
              icon: Star,
              n: "4.8",
              title: "ratingStat",
              desc: "trustedReviews",
            },
            {
              icon: MapPin,
              n: "20+",
              title: "citiesStat",
              desc: "acrossGeorgia",
            },
          ].map(({ icon: Icon, n, title, desc }, i) => (
            <div className="stat-card" key={title}>
              <span className={`stat-icon ${i === 2 ? "gold-bg" : ""}`}>
                <Icon size={30} strokeWidth={1.6} />
              </span>
              <div>
                <strong>{n}</strong>
                <h3>{t(title)}</h3>
                <small>{t(desc)}</small>
              </div>
            </div>
          ))}
        </section>
        <section className="home-section">
          <SectionHeading
            title={t("featured")}
            link={t("viewAll")}
            href="/search"
          />
          <div className="featured-grid">
            {professionals.slice(0, 3).map((p) => (
              <ProfessionalCard p={p} key={p.id} />
            ))}
          </div>
        </section>
        <section className="home-section" id="services">
          <SectionHeading
            title={t("browse")}
            link={t("allServices")}
            href="/search"
          />
          <div className="categories-grid">
            {categories
              .filter((c) => c.id !== "geology")
              .map((c) => (
                <Link
                  className="category-card"
                  key={c.id}
                  href={`/search?category=${c.id}`}
                >
                  <span className="category-icon">
                    <CategoryIcon id={c.id} />
                  </span>
                  <span>
                    <strong>{c.name[locale]}</strong>
                    <small>
                      {c.count}+ {t("professionalsStat")}
                    </small>
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ))}
          </div>
        </section>
        <section className="home-section how-section">
          <h2>{t("howItWorks")}</h2>
          <div className="steps-grid">
            {[Search, ListChecks, Send, CheckCircle2].map((Icon, i) => (
              <div className="step" key={i}>
                <span className="step-number">{i + 1}</span>
                <span className="step-icon">
                  <Icon size={27} strokeWidth={1.5} />
                </span>
                <div>
                  <h3>{t(`step${i + 1}`)}</h3>
                  <p>{t(`stepDesc${i + 1}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="home-section" id="projects">
          <SectionHeading
            title={t("latest")}
            link={t("allProjects")}
            href="/projects"
          />
          <div className="latest-grid">
            {projects.slice(0, 6).map((project) => (
              <button
                className="project-tile"
                key={project.id}
                onClick={() =>
                  openModal({
                    type: "projectDetail",
                    image: project.image,
                    title: project.name[locale],
                    id: project.professionalId,
                  })
                }
              >
                <img
                  src={project.image}
                  alt={project.name[locale]}
                  loading="lazy"
                />
                <span className="project-overlay">
                  <strong>{project.name[locale]}</strong>
                  <small>
                    <MapPin size={12} />
                    {
                      locations.find((l) => l.id === project.location)?.name[
                        locale
                      ]
                    }
                  </small>
                </span>
              </button>
            ))}
          </div>
        </section>
        <Pricing />
        <section className="home-section testimonials">
          <h2>{t("testimonials")}</h2>
          <div className="testimonial-grid">
            {professionals.slice(0, 3).map((p) => {
              const r = p.reviews[0];
              return (
                <article className="testimonial" key={p.id}>
                  <div className="review-avatar">
                    {r.reviewer[locale]
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div>
                    <Stars />
                    <blockquote>{r.comment[locale]}</blockquote>
                    <strong>{r.reviewer[locale]}</strong>
                    <small>
                      {locations.find((l) => l.id === p.location)?.name[locale]}
                    </small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
export function SectionHeading({
  title,
  link,
  href,
}: {
  title: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {link && href && (
        <Link href={href}>
          {link}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
