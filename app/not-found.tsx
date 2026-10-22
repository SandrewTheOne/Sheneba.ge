"use client";
import Link from "next/link";
import { useApp } from "@/components/provider";
export default function NotFound() {
  const { t } = useApp();
  return (
    <main className="container empty-state">
      <h1>404</h1>
      <h2>{t("notFound")}</h2>
      <Link className="button" href="/">
        {t("backHome")}
      </Link>
    </main>
  );
}
