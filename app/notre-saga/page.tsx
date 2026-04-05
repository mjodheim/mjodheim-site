import type { Metadata } from "next";
import SagaPageClient from "./SagaPageClient";

export const metadata: Metadata = {
  title: "Notre saga",
  description: "L'histoire de Mjödheim : quand le passé verse dans la coupe du présent. Hydromel artisanal brassé à Beaumont, Belgique.",
};

export default function NotreSagaPage() {
  return <SagaPageClient />;
}
