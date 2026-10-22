import { notFound } from "next/navigation";
import { professionals } from "@/data/professionals";
import { Profile } from "@/components/profile";
export function generateStaticParams() {
  return professionals.map((p) => ({ id: p.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = professionals.find((p) => p.id === id);
  if (!p) notFound();
  return <Profile p={p} />;
}
