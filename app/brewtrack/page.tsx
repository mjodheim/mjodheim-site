import type { Metadata } from "next";
import AcciseInline from "./AcciseInline";

export const metadata: Metadata = {
  title: { absolute: "BrewTrack - brewery management software built by a brewer" },
  description:
    "BrewTrack is an all-in-one tool for breweries and meaderies: recipes, batches, inventory, sales, invoices and excise duties.",
  openGraph: {
    title: "BrewTrack - built by a brewer, for brewers",
    description: "From recipe to invoice in one tool. EU-ready. Try it for free.",
    url: "https://www.mjodheim.be/brewtrack",
  },
  alternates: { canonical: "https://www.mjodheim.be/brewtrack" },
};

const APP = "https://brewtrack.mjodheim.be";
const GOLD = "#C9A84C", HONEY = "#F5A623", CREAM = "#F5E6CC", DIM = "rgba(245,230,204,0.7)", LINE = "rgba(201,168,76,0.22)";
const SUPPORTED = ["fr", "en", "nl", "de", "es", "it", "pt", "pl", "cs", "da", "sv", "no"] as const;
type Lang = typeof SUPPORTED[number];

type Copy = {
  eyebrow: string;
  intro: string;
  primary: string;
  secondary: string;
  note: string;
  features: { t: string; d: string }[];
  bottomTitle: string;
  bottomText: string;
  bottomCta: string;
};

const COPY: Record<Lang, Copy> = {
  fr: {
    eyebrow: "Le logiciel de la maison",
    intro: "Le logiciel de gestion tout-en-un pour brasseries et meaderies, né dans la brasserie Mjödheim parce qu'aucun outil ne faisait vraiment le job. De la recette à la facture, pensé pour la Belgique et l'Europe.",
    primary: "Essayer gratuitement ->",
    secondary: "Voir l'application",
    note: "Palier gratuit pour démarrer · s'ouvre dans un nouvel onglet",
    features: [
      { t: "Fait par un brasseur", d: "Créé et utilisé au quotidien par la brasserie Mjödheim. Pas une usine à logiciels, un outil pensé par quelqu'un qui brasse vraiment." },
      { t: "De la recette à la facture", d: "Recettes, brassins, stock, ventes, clients, factures et accises au même endroit, fini les tableurs éparpillés." },
      { t: "Conforme Belgique & UE", d: "Accises sur la bière, facturation électronique, TVA, Bancontact. Le terrain que beaucoup d'outils ignorent." },
      { t: "Sur le téléphone aussi", d: "Une appli mobile pour suivre sa production, vendre au marché et facturer depuis la cave." },
    ],
    bottomTitle: "Vous brassez ? Essayez-le.",
    bottomText: "Gratuit pour commencer. Et si vous voulez tester l'appli mobile avant sa sortie, on cherche justement des testeurs.",
    bottomCta: "Ouvrir BrewTrack ->",
  },
  en: {
    eyebrow: "The house software",
    intro: "All-in-one management software for breweries and meaderies, born inside Mjödheim because no tool really did the job. From recipe to invoice, built for Belgium and Europe.",
    primary: "Try for free ->",
    secondary: "Open the app",
    note: "Free tier to get started · opens in a new tab",
    features: [
      { t: "Built by a brewer", d: "Created and used day to day at Mjödheim. Not generic software, but a tool shaped by real brewing work." },
      { t: "Recipe to invoice", d: "Recipes, batches, inventory, sales, customers, invoices and excise duties in one place." },
      { t: "Belgium & EU ready", d: "Beer excise duties, e-invoicing, VAT and local payment workflows included." },
      { t: "Mobile too", d: "A mobile app to follow production, sell at markets and invoice from the cellar." },
    ],
    bottomTitle: "Do you brew? Try it.",
    bottomText: "Free to start. We are also looking for testers for the mobile app before release.",
    bottomCta: "Open BrewTrack ->",
  },
  nl: {
    eyebrow: "De software van het huis",
    intro: "Alles-in-één beheersoftware voor brouwerijen en meaderies, ontstaan bij Mjödheim omdat geen enkel hulpmiddel echt voldeed. Van recept tot factuur, gebouwd voor België en Europa.",
    primary: "Gratis proberen ->",
    secondary: "App bekijken",
    note: "Gratis niveau om te starten · opent in een nieuw tabblad",
    features: [
      { t: "Gemaakt door een brouwer", d: "Gemaakt en dagelijks gebruikt bij Mjödheim. Geen generieke software, maar een tool voor echt brouwwerk." },
      { t: "Van recept tot factuur", d: "Recepten, brouwsels, voorraad, verkoop, klanten, facturen en accijnzen op één plek." },
      { t: "Klaar voor België & EU", d: "Bieraccijnzen, e-facturatie, btw en lokale betaalstromen inbegrepen." },
      { t: "Ook mobiel", d: "Een mobiele app om productie te volgen, op markten te verkopen en te factureren." },
    ],
    bottomTitle: "Brouw je? Probeer het.",
    bottomText: "Gratis om te starten. We zoeken ook testers voor de mobiele app voor de lancering.",
    bottomCta: "BrewTrack openen ->",
  },
  de: {
    eyebrow: "Die Software aus der Brauerei",
    intro: "All-in-one-Verwaltungssoftware für Brauereien und Meaderies, entstanden bei Mjödheim, weil kein Tool wirklich passte. Vom Rezept bis zur Rechnung, für Belgien und Europa gebaut.",
    primary: "Kostenlos testen ->",
    secondary: "App ansehen",
    note: "Kostenloser Einstieg · öffnet in einem neuen Tab",
    features: [
      { t: "Von einem Brauer gebaut", d: "Bei Mjödheim entwickelt und täglich genutzt. Keine generische Software, sondern ein Werkzeug aus der Praxis." },
      { t: "Vom Rezept zur Rechnung", d: "Rezepte, Sude, Lager, Verkäufe, Kunden, Rechnungen und Verbrauchsteuern an einem Ort." },
      { t: "Belgien & EU bereit", d: "Biersteuer, E-Rechnung, MwSt. und lokale Zahlungsabläufe berücksichtigt." },
      { t: "Auch mobil", d: "Eine mobile App für Produktion, Marktverkauf und Rechnungen aus dem Keller." },
    ],
    bottomTitle: "Du braust? Probiere es aus.",
    bottomText: "Kostenlos starten. Für die mobile App suchen wir vor dem Start noch Tester.",
    bottomCta: "BrewTrack öffnen ->",
  },
  es: {
    eyebrow: "El software de la casa",
    intro: "Software todo en uno para cervecerías y meaderies, nacido en Mjödheim porque ninguna herramienta hacía realmente el trabajo. De la receta a la factura, pensado para Bélgica y Europa.",
    primary: "Probar gratis ->",
    secondary: "Ver la app",
    note: "Plan gratuito para empezar · se abre en una pestaña nueva",
    features: [
      { t: "Creado por un cervecero", d: "Creado y usado a diario en Mjödheim. No es software genérico, sino una herramienta hecha desde la práctica." },
      { t: "De la receta a la factura", d: "Recetas, lotes, stock, ventas, clientes, facturas e impuestos especiales en un solo lugar." },
      { t: "Listo para Bélgica y la UE", d: "Accisas de cerveza, factura electrónica, IVA y pagos locales contemplados." },
      { t: "También móvil", d: "Una app móvil para seguir producción, vender en mercados y facturar." },
    ],
    bottomTitle: "¿Elaboras cerveza? Pruébalo.",
    bottomText: "Gratis para empezar. También buscamos testers para la app móvil antes del lanzamiento.",
    bottomCta: "Abrir BrewTrack ->",
  },
  it: {
    eyebrow: "Il software di casa",
    intro: "Software gestionale tutto-in-uno per birrifici e meaderies, nato in Mjödheim perché nessuno strumento faceva davvero il lavoro. Dalla ricetta alla fattura, pensato per Belgio ed Europa.",
    primary: "Prova gratis ->",
    secondary: "Vedi l'app",
    note: "Piano gratuito per iniziare · si apre in una nuova scheda",
    features: [
      { t: "Creato da un birraio", d: "Creato e usato ogni giorno da Mjödheim. Non software generico, ma uno strumento nato dal lavoro reale." },
      { t: "Dalla ricetta alla fattura", d: "Ricette, cotte, magazzino, vendite, clienti, fatture e accise in un unico posto." },
      { t: "Pronto per Belgio e UE", d: "Accise sulla birra, fatturazione elettronica, IVA e pagamenti locali." },
      { t: "Anche mobile", d: "Un'app mobile per seguire produzione, vendere ai mercati e fatturare." },
    ],
    bottomTitle: "Produci birra? Provalo.",
    bottomText: "Gratis per iniziare. Cerchiamo anche tester per l'app mobile prima del lancio.",
    bottomCta: "Apri BrewTrack ->",
  },
  pt: {
    eyebrow: "O software da casa",
    intro: "Software de gestão tudo-em-um para cervejarias e meaderies, nascido na Mjödheim porque nenhuma ferramenta fazia realmente o trabalho. Da receita à fatura, pensado para a Bélgica e a Europa.",
    primary: "Experimentar grátis ->",
    secondary: "Ver a aplicação",
    note: "Plano gratuito para começar · abre num novo separador",
    features: [
      { t: "Criado por um cervejeiro", d: "Criado e usado diariamente na Mjödheim. Não é software genérico, é uma ferramenta feita a partir da prática." },
      { t: "Da receita à fatura", d: "Receitas, lotes, stock, vendas, clientes, faturas e impostos especiais num só lugar." },
      { t: "Pronto para Bélgica e UE", d: "Impostos sobre cerveja, faturação eletrónica, IVA e pagamentos locais." },
      { t: "Também móvel", d: "Uma app móvel para acompanhar produção, vender em mercados e faturar." },
    ],
    bottomTitle: "Produz cerveja? Experimente.",
    bottomText: "Gratuito para começar. Também procuramos testers para a app móvel antes do lançamento.",
    bottomCta: "Abrir BrewTrack ->",
  },
  pl: {
    eyebrow: "Oprogramowanie z browaru",
    intro: "Kompletne oprogramowanie dla browarów i meaderies, stworzone w Mjödheim, bo żadne narzędzie naprawdę nie wystarczało. Od receptury do faktury, dla Belgii i Europy.",
    primary: "Wypróbuj za darmo ->",
    secondary: "Zobacz aplikację",
    note: "Darmowy plan na start · otwiera się w nowej karcie",
    features: [
      { t: "Stworzone przez piwowara", d: "Tworzone i używane codziennie w Mjödheim. To nie jest ogólne narzędzie, tylko system z praktyki browaru." },
      { t: "Od receptury do faktury", d: "Receptury, warki, magazyn, sprzedaż, klienci, faktury i akcyza w jednym miejscu." },
      { t: "Gotowe na Belgię i UE", d: "Akcyza na piwo, e-fakturowanie, VAT i lokalne płatności." },
      { t: "Także mobilnie", d: "Aplikacja mobilna do produkcji, sprzedaży targowej i fakturowania." },
    ],
    bottomTitle: "Warzysz? Wypróbuj.",
    bottomText: "Darmowe na start. Szukamy też testerów aplikacji mobilnej przed premierą.",
    bottomCta: "Otwórz BrewTrack ->",
  },
  cs: {
    eyebrow: "Software z pivovaru",
    intro: "Kompletní software pro pivovary a meaderies, vzniklý v Mjödheim, protože žádný nástroj opravdu nestačil. Od receptu po fakturu, pro Belgii a Evropu.",
    primary: "Vyzkoušet zdarma ->",
    secondary: "Zobrazit aplikaci",
    note: "Bezplatný plán pro začátek · otevře se v nové kartě",
    features: [
      { t: "Vytvořeno sládkem", d: "Vytvořeno a denně používáno v Mjödheim. Ne obecný software, ale nástroj z praxe." },
      { t: "Od receptu po fakturu", d: "Recepty, várky, sklad, prodej, zákazníci, faktury a spotřební daň na jednom místě." },
      { t: "Připraveno pro Belgii a EU", d: "Spotřební daň z piva, e-fakturace, DPH a místní platby." },
      { t: "Také mobilně", d: "Mobilní aplikace pro výrobu, prodej na trzích a fakturaci." },
    ],
    bottomTitle: "Vaříte pivo? Vyzkoušejte.",
    bottomText: "Zdarma pro začátek. Hledáme také testery mobilní aplikace před vydáním.",
    bottomCta: "Otevřít BrewTrack ->",
  },
  da: {
    eyebrow: "Husets software",
    intro: "Alt-i-en styringssoftware til bryggerier og meaderies, født hos Mjödheim fordi intet værktøj virkelig gjorde arbejdet. Fra opskrift til faktura, bygget til Belgien og Europa.",
    primary: "Prøv gratis ->",
    secondary: "Se appen",
    note: "Gratis niveau til at starte · åbner i en ny fane",
    features: [
      { t: "Bygget af en brygger", d: "Skabt og brugt dagligt hos Mjödheim. Ikke generisk software, men et værktøj fra virkeligt bryggeri arbejde." },
      { t: "Fra opskrift til faktura", d: "Opskrifter, bryg, lager, salg, kunder, fakturaer og afgifter samlet ét sted." },
      { t: "Klar til Belgien og EU", d: "Ølafgifter, e-fakturering, moms og lokale betalingsflows." },
      { t: "Også mobil", d: "En mobilapp til produktion, markedssalg og fakturering." },
    ],
    bottomTitle: "Brygger du? Prøv det.",
    bottomText: "Gratis at starte. Vi søger også testere til mobilappen før lancering.",
    bottomCta: "Åbn BrewTrack ->",
  },
  sv: {
    eyebrow: "Husets programvara",
    intro: "Allt-i-ett hanteringsprogram för bryggerier och meaderies, fött hos Mjödheim eftersom inget verktyg verkligen gjorde jobbet. Från recept till faktura, byggt för Belgien och Europa.",
    primary: "Testa gratis ->",
    secondary: "Visa appen",
    note: "Gratis nivå för att komma igång · öppnas i ny flik",
    features: [
      { t: "Byggt av en bryggare", d: "Skapat och använt dagligen hos Mjödheim. Inte generisk programvara, utan ett verktyg från praktiskt bryggarbete." },
      { t: "Från recept till faktura", d: "Recept, brygder, lager, försäljning, kunder, fakturor och punktskatter på ett ställe." },
      { t: "Redo för Belgien och EU", d: "Ölskatt, e-fakturering, moms och lokala betalflöden." },
      { t: "Även mobilt", d: "En mobilapp för produktion, marknadsförsäljning och fakturering." },
    ],
    bottomTitle: "Brygger du? Testa det.",
    bottomText: "Gratis att börja. Vi söker också testare för mobilappen före lansering.",
    bottomCta: "Öppna BrewTrack ->",
  },
  no: {
    eyebrow: "Husets programvare",
    intro: "Alt-i-ett styringsprogram for bryggerier og meaderies, laget hos Mjödheim fordi ingen verktøy virkelig gjorde jobben. Fra oppskrift til faktura, bygget for Belgia og Europa.",
    primary: "Prøv gratis ->",
    secondary: "Se appen",
    note: "Gratis nivå for å starte · åpnes i ny fane",
    features: [
      { t: "Laget av en brygger", d: "Skapt og brukt daglig hos Mjödheim. Ikke generisk programvare, men et verktøy fra praktisk brygging." },
      { t: "Fra oppskrift til faktura", d: "Oppskrifter, batcher, lager, salg, kunder, fakturaer og avgifter på ett sted." },
      { t: "Klar for Belgia og EU", d: "Ølavgifter, e-fakturering, MVA og lokale betalingsflyter." },
      { t: "Også mobilt", d: "En mobilapp for produksjon, markedssalg og fakturering." },
    ],
    bottomTitle: "Brygger du? Prøv det.",
    bottomText: "Gratis å starte. Vi søker også testere for mobilappen før lansering.",
    bottomCta: "Åpne BrewTrack ->",
  },
};

function normalizeLang(value: unknown): Lang {
  const raw = Array.isArray(value) ? value[0] : value;
  const lang = typeof raw === "string" ? raw.slice(0, 2).toLowerCase() : "fr";
  return SUPPORTED.includes(lang as Lang) ? (lang as Lang) : "fr";
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BrewTrackPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const lang = normalizeLang(params.lang);
  const copy = COPY[lang];
  const appRegister = `${APP}/register?lang=${encodeURIComponent(lang)}`;
  const appHome = `${APP}?lang=${encodeURIComponent(lang)}`;

  return (
    <main style={{ background: "#0A0604", color: CREAM, minHeight: "100vh", paddingTop: 150, paddingBottom: 90 }} lang={lang}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 22px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ color: GOLD, fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16 }}>
            {copy.eyebrow}
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(2.4rem,6vw,4rem)", lineHeight: 1.1, margin: "0 0 18px" }}>
            BrewTrack
          </h1>
          <p style={{ color: DIM, fontSize: "1.15rem", maxWidth: "48ch", margin: "0 auto 28px", lineHeight: 1.6 }}>
            {copy.intro}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={appRegister} target="_blank" rel="noopener"
              style={{ background: HONEY, color: "#1a1206", fontWeight: 700, textDecoration: "none", padding: "14px 28px", borderRadius: 8, fontSize: 16 }}>
              {copy.primary}
            </a>
            <a href={appHome} target="_blank" rel="noopener"
              style={{ background: "transparent", color: GOLD, fontWeight: 600, textDecoration: "none", padding: "14px 24px", borderRadius: 8, fontSize: 16, border: `1px solid ${LINE}` }}>
              {copy.secondary}
            </a>
          </div>
          <p style={{ color: "rgba(245,230,204,0.4)", fontSize: 13, marginTop: 14 }}>
            {copy.note}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 44 }} className="bt-grid">
          {copy.features.map((f) => (
            <div key={f.t} style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: "22px 24px", background: "#130D08" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.35rem", fontWeight: 400, color: HONEY, margin: "0 0 8px" }}>{f.t}</h2>
              <p style={{ color: DIM, fontSize: 15, margin: 0, lineHeight: 1.55 }}>{f.d}</p>
            </div>
          ))}
        </div>

        <AcciseInline lang={lang} />

        <div style={{ textAlign: "center", border: `1px solid rgba(245,166,35,0.35)`, borderRadius: 12, padding: "32px 26px", background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(224,90,0,0.05))" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "1.8rem", margin: "0 0 8px" }}>
            {copy.bottomTitle}
          </h2>
          <p style={{ color: DIM, margin: "0 0 20px", maxWidth: "44ch", marginLeft: "auto", marginRight: "auto" }}>
            {copy.bottomText}
          </p>
          <a href={appRegister} target="_blank" rel="noopener"
            style={{ background: HONEY, color: "#1a1206", fontWeight: 700, textDecoration: "none", padding: "14px 30px", borderRadius: 8, fontSize: 16, display: "inline-block" }}>
            {copy.bottomCta}
          </a>
        </div>
      </div>

      <style>{`@media (max-width: 640px) { .bt-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
