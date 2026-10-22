"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  X,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Users,
  ArrowRight,
} from "lucide-react";
import { useApp } from "./provider";
import { categories, projectTypes, locations } from "@/data/categories";
import { professionals, type Professional } from "@/data/professionals";
import { CategoryIcon, ProfessionalCard, MapPanel } from "./ui";
export function SearchPage() {
  const { t, locale, favorites, openModal } = useApp();
  const params = useSearchParams();
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const selectedCats = (params.get("category") || "")
    .split(",")
    .filter(Boolean);
  const types = (params.get("type") || "").split(",").filter(Boolean);
  const location = params.get("location") || "";
  const q = params.get("q") || "";
  const budget = params.get("budget")?.split("-").map(Number);
  const min = Math.max(0, Number(params.get("min") || budget?.[0] || 0));
  const max = Math.max(min, Number(params.get("max") || budget?.[1] || 100));
  const rating = Number(params.get("rating") || 0);
  const sort = params.get("sort") || "rating";
  const list = params.get("view") === "list";
  const onlyFavorites = params.get("favorites") === "1";
  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    if (!("page" in changes)) next.delete("page");
    router.replace(`/search?${next}`, { scroll: false });
  };
  const toggle = (key: string, id: string, values: string[]) =>
    update({
      [key]: values.includes(id)
        ? values.filter((v) => v !== id).join(",")
        : [...values, id].join(","),
    });
  function matches(p: Professional, ignoreCategory = false) {
    const loc = locations.find((l) => l.id === p.location)!;
    return (
      (ignoreCategory ||
        !selectedCats.length ||
        selectedCats.includes(p.category)) &&
      (!types.length || types.some((type) => p.projectTypes.includes(type))) &&
      (!location ||
        p.location === location ||
        loc.name[locale].toLowerCase().includes(location.toLowerCase())) &&
      p.priceFrom >= min &&
      p.priceFrom <= max &&
      p.rating >= rating &&
      (!onlyFavorites || favorites.includes(p.id)) &&
      (!q ||
        [
          p.name.ka,
          p.name.en,
          categories.find((c) => c.id === p.category)?.name[locale] || "",
        ].some((v) => v.toLowerCase().includes(q.toLowerCase())))
    );
  }
  const filtered = professionals
    .filter((p) => matches(p))
    .sort((a, b) =>
      sort === "price"
        ? a.priceFrom - b.priceFrom
        : sort === "experience"
          ? b.yearsExperience - a.yearsExperience
          : b.rating - a.rating,
    );
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(
    totalPages,
    Math.max(1, Number(params.get("page")) || 1),
  );
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => {
    if (drawer) {
      drawerRef.current?.showModal();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        drawerRef.current?.close();
      };
    }
  }, [drawer]);
  const filterUI = (
    <>
      <div className="filter-heading">
        <h2>{t("filters")}</h2>
        <Link href="/search" onClick={() => setDrawer(false)}>
          {t("clearFilters")}
        </Link>
      </div>
      <details open className="filter-section">
        <summary>{t("profession")}</summary>
        {categories.map((c) => (
          <label className="check-row" key={c.id}>
            <input
              type="checkbox"
              checked={selectedCats.includes(c.id)}
              onChange={() => toggle("category", c.id, selectedCats)}
            />
            <span>{c.profession[locale]}</span>
            <small>
              {professionals.filter((p) => p.category === c.id).length}
            </small>
          </label>
        ))}
      </details>
      <details open className="filter-section">
        <summary>{t("projectType")}</summary>
        {projectTypes.map((p) => (
          <label className="check-row" key={p.id}>
            <input
              type="checkbox"
              checked={types.includes(p.id)}
              onChange={() => toggle("type", p.id, types)}
            />
            <span>{p.name[locale]}</span>
          </label>
        ))}
      </details>
      <details open className="filter-section">
        <summary>{t("location")}</summary>
        <label
          className="sr-only"
          htmlFor={drawer ? "mobile-location" : "filter-location"}
        >
          {t("location")}
        </label>
        <select
          id={drawer ? "mobile-location" : "filter-location"}
          value={locations.some((l) => l.id === location) ? location : ""}
          onChange={(e) => update({ location: e.target.value })}
        >
          <option value="">{t("any")}</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name[locale]}
            </option>
          ))}
        </select>
      </details>
      <details open className="filter-section">
        <summary>{t("price")}</summary>
        <label className="range-label">
          {t("max")}: ${max}
          <input
            type="range"
            min={0}
            max={100}
            value={max}
            onChange={(e) => update({ max: e.target.value, budget: "" })}
          />
        </label>
        <div className="price-inputs">
          <label>
            {t("min")}
            <input
              type="number"
              min={0}
              max={max}
              value={min}
              onChange={(e) => update({ min: e.target.value, budget: "" })}
            />
          </label>
          <span>–</span>
          <label>
            {t("max")}
            <input
              type="number"
              min={min}
              max={100}
              value={max}
              onChange={(e) => update({ max: e.target.value, budget: "" })}
            />
          </label>
        </div>
      </details>
      <details open className="filter-section">
        <summary>{t("rating")}</summary>
        {[4, 3, 2].map((r) => (
          <label className="check-row" key={r}>
            <input
              type="checkbox"
              checked={rating === r}
              onChange={() => update({ rating: rating === r ? "" : String(r) })}
            />
            <span>
              <span className="gold">★</span> {r}+ {t("above")}
            </span>
          </label>
        ))}
      </details>
    </>
  );
  const pills = [
    ...selectedCats.map((id) => ({
      key: "category",
      value: id,
      label: categories.find((c) => c.id === id)?.profession[locale] || id,
    })),
    ...types.map((id) => ({
      key: "type",
      value: id,
      label: projectTypes.find((p) => p.id === id)?.name[locale] || id,
    })),
    ...(location
      ? [
          {
            key: "location",
            value: location,
            label:
              locations.find((l) => l.id === location)?.name[locale] ||
              location,
          },
        ]
      : []),
    ...(budget || params.has("min") || params.has("max")
      ? [{ key: "budget", value: "", label: `$${min}–${max}/m²` }]
      : []),
    ...(rating ? [{ key: "rating", value: "", label: `${rating}+ ★` }] : []),
    ...(q ? [{ key: "q", value: q, label: q }] : []),
    ...(onlyFavorites
      ? [{ key: "favorites", value: "", label: t("favoritesOnly") }]
      : []),
  ];
  return (
    <main className="search-page page-content">
      <div className="breadcrumb">
        <Link href="/">{t("home")}</Link>
        <ChevronRight size={13} />
        <span>{t("professionals")}</span>
        <ChevronRight size={13} />
        <span>{t("results")}</span>
      </div>
      <div className="results-heading">
        <div>
          <h1>{t("found", { count: filtered.length })}</h1>
          <p>{t("resultsText")}</p>
        </div>
        <button
          className="button outline mobile-filter-trigger"
          onClick={() => setDrawer(true)}
        >
          <SlidersHorizontal size={17} />
          {t("filters")}
        </button>
      </div>
      <div className="filter-pills">
        {pills.map((p, i) => (
          <button
            className="filter-pill"
            key={i}
            onClick={() => {
              if (p.key === "category")
                toggle("category", p.value, selectedCats);
              else if (p.key === "type") toggle("type", p.value, types);
              else if (p.key === "budget")
                update({ budget: "", min: "", max: "" });
              else update({ [p.key]: "" });
            }}
          >
            {p.label}
            <X size={14} />
          </button>
        ))}
      </div>
      <div className="search-layout">
        <aside className="filter-sidebar">{!drawer && filterUI}</aside>
        <section className="results-main" aria-live="polite">
          <div className="category-tabs">
            <button
              className={!selectedCats.length ? "active" : ""}
              onClick={() => update({ category: "" })}
            >
              {t("allResults")} (
              {professionals.filter((p) => matches(p, true)).length})
            </button>
            {categories.slice(0, 6).map((c) => (
              <button
                key={c.id}
                className={
                  selectedCats.length === 1 && selectedCats[0] === c.id
                    ? "active"
                    : ""
                }
                onClick={() => update({ category: c.id })}
              >
                <CategoryIcon id={c.id} size={16} />
                {c.profession[locale]} (
                {
                  professionals.filter(
                    (p) => p.category === c.id && matches(p, true),
                  ).length
                }
                )
              </button>
            ))}
          </div>
          <div className="results-toolbar">
            <span>
              {t("page")} {page} / {totalPages}
            </span>
            <div>
              <label>
                {t("sort")}
                <select
                  value={sort}
                  onChange={(e) => update({ sort: e.target.value })}
                >
                  <option value="rating">{t("byRating")}</option>
                  <option value="price">{t("byPrice")}</option>
                  <option value="experience">{t("byExperience")}</option>
                </select>
              </label>
              <div className="view-toggle">
                <button
                  className={!list ? "active" : ""}
                  aria-label={t("grid")}
                  aria-pressed={!list}
                  onClick={() => update({ view: "" })}
                >
                  <LayoutGrid size={19} />
                </button>
                <button
                  className={list ? "active" : ""}
                  aria-label={t("list")}
                  aria-pressed={list}
                  onClick={() => update({ view: "list" })}
                >
                  <List size={19} />
                </button>
              </div>
            </div>
          </div>
          <div className={`results-grid ${list ? "list-results" : ""}`}>
            {shown.map((p) => (
              <ProfessionalCard key={p.id} p={p} list={list} />
            ))}
          </div>
          {!shown.length && (
            <div className="empty-state">
              <SearchEmpty />
              <h2>{t("empty")}</h2>
              <p>
                {onlyFavorites && !favorites.length
                  ? t("noFavorites")
                  : t("emptyText")}
              </p>
              <Link className="button" href="/search">
                {t("clearFilters")}
              </Link>
            </div>
          )}
          <nav className="pagination" aria-label={t("page")}>
            <button
              disabled={page === 1}
              aria-label={t("previous")}
              onClick={() => update({ page: String(page - 1) })}
            >
              <ChevronLeft size={17} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                aria-current={page === i + 1 ? "page" : undefined}
                onClick={() => update({ page: String(i + 1) })}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              aria-label={t("next")}
              onClick={() => update({ page: String(page + 1) })}
            >
              <ChevronRight size={17} />
            </button>
          </nav>
        </section>
        <aside className="map-sidebar">
          <MapPanel />
          <div className="recommend-card">
            <span className="stat-icon">
              <Users size={29} />
            </span>
            <h3>{t("recommendTitle")}</h3>
            <p>{t("recommendText")}</p>
            <button
              className="button outline"
              onClick={() => openModal({ type: "project" })}
            >
              {t("contactUs")}
              <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </div>
      {drawer && (
        <dialog
          ref={drawerRef}
          className="filter-drawer"
          aria-label={t("filters")}
          onCancel={() => setDrawer(false)}
        >
          <div className="drawer-close">
            <button
              className="icon-button"
              aria-label={t("close")}
              onClick={() => setDrawer(false)}
            >
              <X />
            </button>
          </div>
          {filterUI}
          <button
            className="button drawer-apply"
            onClick={() => setDrawer(false)}
          >
            {t("applyFilters")} ({filtered.length})
          </button>
        </dialog>
      )}
    </main>
  );
}
function SearchEmpty() {
  return <Users size={44} strokeWidth={1} />;
}
