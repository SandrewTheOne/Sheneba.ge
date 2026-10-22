"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  House,
  Search,
  Heart,
  Menu,
  X,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useApp } from "./provider";
export function Logo() {
  const {t} = useApp();
  return (
    <Link href="/" className="logo">
      <House size={35} strokeWidth={1.7} />
      <span>
        <strong>Sheneba.ge</strong>
        <small>{t("brandTagline")}</small>
      </span>
    </Link>
  );
}
export function Header() {
  const { t, locale, setLocale, favorites, openModal } = useApp();
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const nav = [
    ["home", "/"],
    ["professionals", "/search"],
    ["projects", "/#projects"],
    ["services", "/#services"],
    ["pricing", "/pricing"],
  ];
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>{t("demo")}</span>
          <button
            aria-label={t("language")}
            onClick={() => setLocale(locale === "ka" ? "en" : "ka")}
          >
            <b className={locale === "ka" ? "active" : ""}>GE</b>
            <span>/</span>
            <b className={locale === "en" ? "active" : ""}>EN</b>
          </button>
        </div>
      </div>
      <header className="header">
        <div className="header-inner">
          <Logo />
          <form
            className="header-search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${encodeURIComponent(q)}`);
            }}
          >
            <Search size={15} />
            <input
              aria-label={t("search")}
              placeholder={t("searchPlaceholder")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button aria-label={t("search")}>
              <ArrowRight size={15} />
            </button>
          </form>
          <nav aria-label={t("menu")} className={menu ? "nav nav-open" : "nav"}>
            {nav.map(([label, url]) => (
              <Link
                key={label}
                href={url}
                onClick={() => setMenu(false)}
                className={
                  url === path ||
                  (url === "/search" && path.startsWith("/professional"))
                    ? "active"
                    : ""
                }
              >
                {t(label)}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="icon-button favorite-nav"
              href="/search?favorites=1"
              aria-label={t("favorites")}
            >
              <Heart size={20} />
              {favorites.length > 0 && <span>{favorites.length}</span>}
            </Link>
            <button
              className="button outline login-button"
              onClick={() => openModal({ type: "login" })}
            >
              {t("login")}
            </button>
            <button
              className="button register-button"
              onClick={() => openModal({ type: "register" })}
            >
              {t("register")}
            </button>
            <button
              className="icon-button mobile-menu"
              aria-label={t("menu")}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  const { t, openModal } = useApp();
  const groups = [
    { title: "company", links: ["aboutUs", "terms", "privacy"] },
    { title: "professionals", links: ["professionals", "services", "pricing"] },
    { title: "help", links: ["faq", "contactUs", "postProject"] },
  ];
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Logo />
          <p>{t("footerTagline")}</p>
          <div className="socials">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <button
                key={i}
                aria-label={["Facebook", "Instagram", "LinkedIn", "YouTube"][i]}
                onClick={() =>
                  openModal({
                    type: "info",
                    title: "Sheneba.ge",
                    text: t("socialNotice"),
                  })
                }
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h3>{t(g.title)}</h3>
            {g.links.map((l) =>
              ["professionals", "services", "pricing"].includes(l) ? (
                <Link
                  key={l}
                  href={
                    l === "professionals"
                      ? "/search"
                      : l === "services"
                        ? "/#services"
                        : "/pricing"
                  }
                >
                  {t(l)}
                </Link>
              ) : (
                <button
                  key={l}
                  onClick={() =>
                    l === "postProject"
                      ? openModal({ type: "project" })
                      : openModal({
                          type: "info",
                          title: t(l),
                          text: t(
                            l === "faq"
                              ? "faqText"
                              : l === "contactUs"
                                ? "contactNotice"
                                : l === "aboutUs"
                                  ? "aboutText"
                                  : "policyText",
                          ),
                        })
                  }
                >
                  {t(l)}
                </button>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Sheneba.ge. {t("rights")}
        </span>
        <span>{t("demo")}</span>
      </div>
    </footer>
  );
}
