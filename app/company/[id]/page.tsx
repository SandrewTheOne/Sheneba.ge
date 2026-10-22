import { notFound } from "next/navigation";
import { professionals } from "@/data/professionals";
import { Profile } from "@/components/profile";
export function generateStaticParams() {
  return professionals.filter((p) => p.company).map((p) => ({ id: p.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = professionals.find((p) => p.id === id && p.company);
  if (!p) notFound();
  return <Profile p={p} company />;
}
