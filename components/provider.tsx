"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import ka from "@/locales/ka.json";
import en from "@/locales/en.json";
import type { Locale } from "@/data/categories";
export type ModalState = {
  type:
    | "login"
    | "register"
    | "project"
    | "chat"
    | "review"
    | "info"
    | "image"
    | "plan"
    | "certificate"
    | "projectDetail";
  id?: string;
  title?: string;
  image?: string;
  text?: string;
};
type Context = {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
  setLocale: (l: Locale) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  modal: ModalState | null;
  openModal: (m: ModalState) => void;
  closeModal: () => void;
};
const AppContext = createContext<Context | null>(null);
export function Provider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ka");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalState | null>(null);
  useEffect(() => {
    try {
      const l = localStorage.getItem("sheneba-locale");
      if (l === "en") setLocaleState("en");
      const f = JSON.parse(localStorage.getItem("sheneba-favorites") || "[]");
      if (Array.isArray(f))
        setFavorites(f.filter((v: unknown) => typeof v === "string"));
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("sheneba-locale", l);
  };
  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];
      localStorage.setItem("sheneba-favorites", JSON.stringify(next));
      return next;
    });
  const t = (key: string, params?: Record<string, string | number>) => {
    let value = (locale === "ka" ? ka : en)[key as keyof typeof ka] || key;
    for (const [k, v] of Object.entries(params || {}))
      value = value.replaceAll(`{${k}}`, String(v));
    return value;
  };
  return (
    <AppContext.Provider
      value={{
        locale,
        t,
        setLocale,
        favorites,
        toggleFavorite,
        modal,
        openModal: setModal,
        closeModal: () => setModal(null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("Provider is required");
  return value;
}
