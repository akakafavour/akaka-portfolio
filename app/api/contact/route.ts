/**
 * Contact form endpoint — receives the portfolio form and emails it to
 * Akaka via Resend (already in his stack; no dependency needed — plain
 * fetch to the Resend REST API).
 *
 * Config (Vercel env vars or .env.local):
 *   RESEND_API_KEY    — from resend.com/api-keys. Without it, the route
 *                       still returns ok:true with delivered:false and the
 *                       form falls back to composing an email client draft.
 *   CONTACT_TO_EMAIL  — where inquiries land (defaults to the placeholder
 *                       until Akaka's official address is wired in).
 *   NOTE: Resend's free tier can only send from onboarding@resend.dev to
 *   the account owner's email until a domain is verified.
 */
export async function POST(req: Request) {
  let name = "";
  let email = "";
  let message = "";
  try {
    const body = await req.json();
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    message = String(body.message ?? "").trim();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  if (!name || !email || !message || !/.+@.+\..+/.test(email)) {
    return Response.json(
      { ok: false, error: "Fill every field and use a valid email." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured yet — let the form fall back to a mailto draft.
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL ?? "hello@akaka-favour.com",
        subject: `Project inquiry from ${name}`,
        text: `${message}\n\n— ${name}\n${email}`,
        reply_to: email,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return Response.json({ ok: true, delivered: true });
  } catch {
    return Response.json(
      { ok: false, error: "Sending failed — email me directly instead." },
      { status: 500 },
    );
  }
}
