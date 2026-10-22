"use client";
import {
  Building2,
  Armchair,
  Ruler,
  HardHat,
  Settings,
  Trees,
  Compass,
  Mountain,
  Box,
  Star,
  MapPin,
  ShieldCheck,
  Heart,
  ArrowUpRight,
  Briefcase,
  MessageCircle,
  Map,
} from "lucide-react";
import Link from "next/link";
import { categories, locations, projectTypes } from "@/data/categories";
import { type Professional, professionalHref } from "@/data/professionals";
import { useApp } from "./provider";
const icons = {
  Building2,
  Armchair,
  Ruler,
  HardHat,
  Settings,
  Trees,
  Compass,
  Mountain,
  Box,
};
export function CategoryIcon({ id, size = 28 }: { id: string; size?: number }) {
  const c = categories.find((c) => c.id === id);
  const Icon = icons[(c?.icon || "Building2") as keyof typeof icons];
  return <Icon size={size} strokeWidth={1.5} />;
}
export function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span className="stars" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}
export function Verified({ compact = false }: { compact?: boolean }) {
  const { t } = useApp();
  return (
    <span
      className={compact ? "verified-icon" : "verified"}
      title={t("verified")}
    >
      <ShieldCheck size={compact ? 17 : 14} />
      {!compact && t("verified")}
    </span>
  );
}
export function SaveButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const { favorites, toggleFavorite, t } = useApp();
  const saved = favorites.includes(id);
  return (
    <button
      type="button"
      className={`save-button ${saved ? "is-saved" : ""} ${className}`}
      aria-label={saved ? t("saved") : t("save")}
      aria-pressed={saved}
      onClick={() => toggleFavorite(id)}
    >
      <Heart size={20} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
export function ProfessionalCard({
  p,
  list = false,
}: {
  p: Professional;
  list?: boolean;
}) {
  const { locale, t, openModal } = useApp();
  const cat = categories.find((c) => c.id === p.category)!;
  const loc = locations.find((l) => l.id === p.location)!;
  return (
    <article className={`professional-card ${list ? "list-card" : ""}`}>
      <div className="card-cover">
        <Link href={professionalHref(p)} tabIndex={-1} aria-hidden="true">
          <img
            src={
              p.portfolio[
                p.category === "interior"
                  ? 1
                  : p.category === "construction"
                    ? 2
                    : 0
              ].image
            }
            alt=""
          />
        </Link>
        <SaveButton id={p.id} />
      </div>
      <div className="card-content">
        <div className="card-identity">
          <div className={`avatar ${p.company ? "studio-avatar" : ""}`}>
            {p.avatar}
          </div>
          <div>
            <Link href={professionalHref(p)} className="card-name">
              {p.name[locale]}
            </Link>
            {p.verified && <Verified compact />}
            <p className="muted">{cat.profession[locale]}</p>
          </div>
        </div>
        <div className="card-meta">
          <span>
            <Star size={14} className="gold" fill="currentColor" />
            <strong>{p.rating}</strong>
            <small className="muted">
              ({p.reviewCount} {t("reviews")})
            </small>
          </span>
          <span>
            <MapPin size={13} />
            {loc.name[locale]}
          </span>
          <strong className="card-price">
            ${p.priceFrom}/m² <small>{t("from")}</small>
          </strong>
        </div>
        <div className="card-experience">
          <span>
            <Briefcase size={14} />
            {p.yearsExperience} {t("years")}
          </span>
          <span>
            <Building2 size={14} />
            {p.completedProjects}+ {t("projects")}
          </span>
        </div>
        <div className="mini-portfolio">
          {p.portfolio.slice(0, 3).map((project, i) => (
            <button
              key={project.id}
              onClick={() =>
                openModal({
                  type: "image",
                  image: project.image,
                  title: project.name[locale],
                })
              }
              aria-label={project.name[locale]}
            >
              <img src={project.image} alt={project.name[locale]} />
              {i === 2 && <span>+{p.portfolio.length - 2}</span>}
            </button>
          ))}
        </div>
        <div className="tags">
          {p.projectTypes.slice(0, 2).map((type, i) => (
            <span key={type}>
              {i === 0
                ? projectTypes.find((p) => p.id === "house")!.name[locale]
                : t("commercial")}
            </span>
          ))}
        </div>
        <div className="card-actions">
          <Link className="button outline" href={professionalHref(p)}>
            {t("profile")}
            <ArrowUpRight size={14} />
          </Link>
          <button
            className="button"
            onClick={() => openModal({ type: "chat", id: p.id })}
          >
            <MessageCircle size={15} />
            {t("chat")}
          </button>
        </div>
      </div>
    </article>
  );
}
// TODO: Replace this static map placeholder with a maps provider and geocoded locations.
export function MapPanel({ large = false, locationId = "tbilisi" }: { large?: boolean; locationId?: string }) {
  const { t, locale } = useApp();
  return (
    <div
      className={`map-panel ${large ? "large-map" : ""}`}
      aria-label={t("ourLocation")}
    >
      <div className="map-label">
        <Map size={16} />
        {t("ourLocation")}
      </div>
      <div className="map-placeholder">
        <Map size={90} strokeWidth={0.65} />
      </div>
      {[
        [24, 35],
        [70, 30],
        [50, 51],
        [22, 69],
        [76, 76],
        [43, 82],
      ].map(([x, y], i) => (
        <MapPin
          className="map-pin"
          key={i}
          fill="#245b49"
          color="white"
          size={30}
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
      <strong className="map-city">{(locations.find(l => l.id === locationId) || locations[0]).name[locale]}</strong>
      <small className="map-note">{t("demoMap")}</small>
    </div>
  );
}
