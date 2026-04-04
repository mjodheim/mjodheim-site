import type { Metadata } from "next";
import { getEvents } from "@/lib/content";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Événements",
  description: "Retrouvez Mjödheim sur les marchés médiévaux et événements en Belgique.",
};

export default async function EvenementsPage() {
  const events = await getEvents();
  return <EventsClient events={events} />;
}
