import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, clientIp } from "@/lib/rate-limit";


// Échappe le HTML : empêche l'injection de balises/liens dans l'email reçu.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  // Anti-spam : 5 envois / 10 min par IP.
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop d'envois. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const nom = str(body.nom);
  const email = str(body.email);
  const telephone = str(body.telephone);
  const sujet = str(body.sujet).replace(/[\r\n]+/g, " "); // pas de saut de ligne dans le sujet
  const message = str(body.message);

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  if (nom.length > 100 || sujet.length > 150 || telephone.length > 40 || message.length > 5000) {
    return NextResponse.json({ error: "Un des champs est trop long." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json({ error: "Service email non configuré." }, { status: 503 });
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: "Mjödheim Contact <contact@mjodheim.be>",
    to: process.env.CONTACT_EMAIL ?? "contact@mjodheim.be",
    replyTo: email,
    subject: sujet ? `[Mjödheim] ${sujet}` : `[Mjödheim] Nouveau message de ${nom}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0A0604; color: #F5E6CC; padding: 2rem; border: 1px solid #C9A84C44;">
        <h2 style="color: #C9A84C; font-size: 1.5rem; margin-bottom: 1.5rem;">
          Nouveau message — Mjödheim
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; width: 130px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Nom</td>
            <td style="padding: 0.5rem 0;">${esc(nom)}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${esc(email)}" style="color: #F5E6CC;">${esc(email)}</a></td>
          </tr>
          ${telephone ? `<tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Téléphone</td>
            <td style="padding: 0.5rem 0;">${esc(telephone)}</td>
          </tr>` : ""}
          ${sujet ? `<tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Sujet</td>
            <td style="padding: 0.5rem 0;">${esc(sujet)}</td>
          </tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #C9A84C44; margin: 1.5rem 0;" />
        <p style="line-height: 1.8; white-space: pre-wrap;">${esc(message)}</p>
        <hr style="border: none; border-top: 1px solid #C9A84C44; margin: 1.5rem 0;" />
        <p style="font-size: 0.75rem; color: rgba(245,230,204,0.4);">
          Message reçu via le formulaire de contact mjodheim.be
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
