import { notFound } from "next/navigation";

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.KEYSTATIC_DISABLE === "true") notFound();
  return children;
}
