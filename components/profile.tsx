"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Briefcase,
  Layers,
  Tag,
  ChevronRight,
  Phone,
  MessageCircle,
  Download,
  Clock,
  CalendarDays,
  Users,
  Globe,
  BarChart3,
  GraduationCap,
  ArrowUpRight,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { type Professional, type Review } from "@/data/professionals";
import { categories, locations } from "@/data/categories";
import { useApp } from "./provider";
import { Verified, SaveButton, Stars, CategoryIcon, MapPanel } from "./ui";
export function Profile({
  p,
  company = false,
}: {
  p: Professional;
  company?: boolean;
}) {
  const { t, locale, openModal } = useApp();
  const [active, setActive] = useState("about");
  const [addedReviews, setAddedReviews] = useState<Review[]>([]);
  const cat = categories.find((c) => c.id === p.category)!;
  const loc = locations.find((l) => l.id === p.location)!;
  useEffect(() => {
    const listener = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (d.professionalId === p.id)
        setAddedReviews((prev) => [d.review, ...prev]);
    };
    window.addEventListener("sheneba-review", listener);
    return () => window.removeEventListener("sheneba-review", listener);
  }, [p.id]);
  const tabs = [
    "about",
    "portfolio",
    "services",
    "education",
    "verifiedReviews",
  ];
  const scrollTo = (id: string) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  function saveContact() {
    // TODO: Replace the local vCard export with a backend contact integration.
    const name = p.name[locale].replace(/[\n\r;,]/g, " ");
    const text = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:${name}\r\nTEL:${p.phone}\r\nEND:VCARD\r\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/vcard" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${p.id}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="profile-page page-content">
      <div className="breadcrumb">
        <Link href="/">{t("home")}</Link>
        <ChevronRight size={13} />
        <Link href="/search">{t("professionals")}</Link>
        <ChevronRight size={13} />
        <span>{p.name[locale]}</span>
      </div>
      <div className="profile-layout">
        <div className="profile-main">
          <section className="profile-overview">
            <div className="profile-banner">
              <img
                src={p.portfolio[p.category === "interior" ? 1 : 0].image}
                alt={p.name[locale]}
              />
              <SaveButton id={p.id} />
            </div>
            <div className="profile-identity">
              <div className="profile-avatar">{p.avatar}</div>
              <div>
                <h1>
                  {p.name[locale]} {p.verified && <Verified compact />}
                </h1>
                <p>
                  {cat.name[locale]}
                  {company && ` · ${t("company")}`}
                </p>
                <div className="profile-rating">
                  <Star size={20} fill="currentColor" className="gold" />
                  <strong>{p.rating}</strong>
                  <span>
                    {p.reviewCount + addedReviews.length} {t("reviews")}
                  </span>
                  <Users size={17} />
                  <span>
                    {p.completedProjects}+ {t("projects")}
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-stats">
              {[
                {
                  icon: Briefcase,
                  label: "experience",
                  value: `${p.yearsExperience} ${t("years")}`,
                },
                {
                  icon: Tag,
                  label: "price",
                  value: `$${p.priceFrom}/m² ${t("from")}`,
                },
                { icon: MapPin, label: "location", value: p.workArea[locale] },
                {
                  icon: Layers,
                  label: "completed",
                  value: `${p.completedProjects}+ ${t("projects")}`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <Icon size={24} strokeWidth={1.4} />
                  <span>
                    <small>{t(label)}</small>
                    <strong>{value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </section>
          <nav className="profile-tabs" aria-label={t("profile")}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={active === tab ? "active" : ""}
                aria-current={active === tab ? "location" : undefined}
                onClick={() => scrollTo(tab)}
              >
                {t(tab)}
              </button>
            ))}
          </nav>
          <div className="profile-sections">
            <section id="about">
              <h2>{t("about")}</h2>
              <p className="about-copy">{p.about[locale]}</p>
            </section>
            {company && (
              <section id="team">
                <h2>{t("leadership")}</h2>
                <div className="team-grid">
                  {p.team.map((member, i) => (
                    <article key={i}>
                      <span className="avatar">
                        {member.name[locale]
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <h3>{member.name[locale]}</h3>
                      <p>{member.role[locale]}</p>
                      <small>
                        {member.experience} {t("years")}
                      </small>
                      <p>{member.bio[locale]}</p>
                    </article>
                  ))}
                </div>
                <h3 className="partners-heading">{t("partners")}</h3>
                <div className="partner-row">
                  {p.partners.map((partner) => (
                    <article key={partner.name}>
                      <h3>
                        <Building2 size={18} />
                        {partner.name}
                      </h3>
                      <p>{partner.bio[locale]}</p>
                      <small>
                        {partner.years} {t("years")}
                      </small>
                    </article>
                  ))}
                </div>
              </section>
            )}
            <section id="portfolio">
              <div className="section-heading">
                <h2>{t("portfolio")}</h2>
                <span className="muted">
                  {p.portfolio.length} {t("portfolioCount")}
                </span>
              </div>
              <div className="portfolio-grid">
                {p.portfolio.map((project) => (
                  <button
                    className="portfolio-item"
                    key={project.id}
                    onClick={() =>
                      openModal({
                        type: "image",
                        image: project.image,
                        title: project.name[locale],
                      })
                    }
                  >
                    <img src={project.image} alt={project.name[locale]} />
                    <span>
                      <strong>{project.name[locale]}</strong>
                      <ArrowUpRight size={15} />
                    </span>
                    <small>{cat.name[locale]}</small>
                  </button>
                ))}
              </div>
            </section>
            <section id="services">
              <h2>{t("services")}</h2>
              <div className="services-grid">
                {p.services.map((s, i) => (
                  <article className="service-item" key={i}>
                    <CategoryIcon
                      id={i === 2 ? "visualization" : p.category}
                      size={28}
                    />
                    <h3>{s.name[locale]}</h3>
                    <p>{t("serviceDescription")}</p>
                    <strong>
                      ${s.price}/{s.unit[locale]} <small>{t("from")}</small>
                    </strong>
                  </article>
                ))}
              </div>
            </section>
            <section id="education">
              <h2>{t("education")}</h2>
              <div className="education-grid">
                {p.education.map((e, i) => (
                  <button
                    key={i}
                    className="education-card"
                    onClick={() =>
                      openModal({
                        type: "certificate",
                        text: `${e.degree[locale]} — ${e.institution[locale]}, ${e.year}. ${t("certificateDetail")}`,
                      })
                    }
                  >
                    <GraduationCap size={35} strokeWidth={1.2} />
                    <span>
                      <strong>{e.degree[locale]}</strong>
                      <small>
                        {e.institution[locale]} · {e.year}
                      </small>
                    </span>
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
            </section>
            <section id="verifiedReviews">
              <div className="section-heading">
                <h2>{t("verifiedReviews")}</h2>
                <button
                  className="button outline"
                  onClick={() => openModal({ type: "review", id: p.id })}
                >
                  {t("leaveReview")}
                </button>
              </div>
              <div className="reviews-list">
                {[...addedReviews, ...p.reviews].map((r) => (
                  <article className="review-card" key={r.id}>
                    <div className="review-top">
                      <span className="review-avatar">
                        {r.reviewer[locale]
                          .split(" ")
                          .map((s) => s[0])
                          .join("")}
                      </span>
                      <div>
                        <strong>{r.reviewer[locale]}</strong>
                        <small>
                          {`${Number(r.date.slice(8, 10))} ${t(`month${Number(r.date.slice(5, 7))}`)} ${r.date.slice(0, 4)}`}
                        </small>
                      </div>
                      <div>
                        <Stars rating={r.rating} />
                        <b>{r.rating.toFixed(1)}</b>
                        {!addedReviews.includes(r) && (
                          <span className="review-verified">
                            <CheckCircle2 size={13} />
                            {t("verified")}
                          </span>
                        )}
                      </div>
                    </div>
                    <p>{r.comment[locale]}</p>
                    <div className="review-breakdown">
                      {Object.entries(r.breakdown).map(([key, value]) => (
                        <div key={key}>
                          <span>{t(key)}</span>
                          <span>
                            <Star
                              size={11}
                              className="gold"
                              fill="currentColor"
                            />
                            <strong>{value}.0</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
        <aside className="profile-sidebar">
          <div className="contact-card">
            <div className="contact-title">
              <h2>{t("contact")}</h2>
              <span>
                <i />
                {t("available")}
              </span>
            </div>
            <a className="button" href={`tel:${p.phone.replaceAll(" ", "")}`}>
              <Phone size={17} />
              {t("call")}
            </a>
            <p className="phone-number">{p.phone}</p>
            <button
              className="button outline"
              onClick={() => openModal({ type: "chat", id: p.id })}
            >
              <MessageCircle size={18} />
              {t("openChat")}
            </button>
            <button className="button outline" onClick={saveContact}>
              <Download size={18} />
              {t("saveContact")}
            </button>
            <div className="contact-facts">
              {p.verified && <Verified />}
              <p>
                <MapPin size={18} />
                {loc.name[locale]}
              </p>
              <p>
                <Clock size={18} />
                {t("responseTime")}
              </p>
              <p>
                <CalendarDays size={18} />
                <span>
                  {t("hours")}
                  <small>{p.workingHours[locale]}</small>
                </span>
              </p>
            </div>
          </div>
          <div className="quick-info">
            <h2>{t("quickInfo")}</h2>
            {[
              {
                icon: Briefcase,
                label: "completed",
                value: `${p.completedProjects}+`,
              },
              { icon: BarChart3, label: "satisfied", value: "95%" },
              {
                icon: Clock,
                label: "responseRate",
                value: `${p.responseRate}%`,
              },
              { icon: Globe, label: "languages", value: t("languagesValue") },
              {
                icon: Users,
                label: "teamSize",
                value: company ? `5–10 ${t("people")}` : `1 ${t("people")}`,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon size={19} />
                <span>{t(label)}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="location-card">
            <h2>{t(company ? "office" : "ourLocation")}</h2>
            <MapPanel locationId={p.location} />
          </div>
          <div className="profile-quote">
            <blockquote>{t("quote")}</blockquote>
            <p>— {p.name[locale]}</p>
            <img src="/images/garden.png" alt="" />
          </div>
        </aside>
      </div>
    </main>
  );
}
