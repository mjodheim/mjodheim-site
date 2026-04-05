import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { nom, email, telephone, sujet, message } = await request.json();

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Mjödheim Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL ?? "anthonymets.be@gmail.com",
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
            <td style="padding: 0.5rem 0;">${nom}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #F5E6CC;">${email}</a></td>
          </tr>
          ${telephone ? `<tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Téléphone</td>
            <td style="padding: 0.5rem 0;">${telephone}</td>
          </tr>` : ""}
          ${sujet ? `<tr>
            <td style="padding: 0.5rem 0; color: #C9A84C; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Sujet</td>
            <td style="padding: 0.5rem 0;">${sujet}</td>
          </tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #C9A84C44; margin: 1.5rem 0;" />
        <p style="line-height: 1.8; white-space: pre-wrap;">${message}</p>
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
