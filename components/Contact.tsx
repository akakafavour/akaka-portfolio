import SectionEyebrow from "./SectionEyebrow";

const WHATSAPP_URL = "https://wa.me/REPLACE_WITH_NUMBER";
const EMAIL_URL = "mailto:[AKAKA-EMAIL]";
const X_URL = "https://x.com/[X-HANDLE]";
const GITHUB_URL = "https://github.com/Akakaui";
const FORM_ENDPOINT = "[FORM-ENDPOINT]";

const CHANNELS = [
  { label: "Email", value: "[AKAKA-EMAIL]", href: EMAIL_URL, external: false },
  { label: "WhatsApp", value: "Fastest reply", href: WHATSAPP_URL, external: true },
  { label: "X", value: "@[X-HANDLE]", href: X_URL, external: true },
  { label: "GitHub", value: "github.com/Akakaui", href: GITHUB_URL, external: true },
];

/**
 * Contact — mockup-accurate and compact: minimal form (posts to
 * [FORM-ENDPOINT], mailto fallback) + "OR JUST SAY HI" channel row.
 * Ink/yellow styling; no channel is color-coded.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <SectionEyebrow label="Contact" />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <form action={FORM_ENDPOINT} method="POST" className="grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="contact-name" className="eyebrow text-muted">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="rounded-lg border border-ink bg-surface px-4 py-3 text-ink placeholder:text-muted/60"
              placeholder="Adaeze Okafor"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-email" className="eyebrow text-muted">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-lg border border-ink bg-surface px-4 py-3 text-ink placeholder:text-muted/60"
              placeholder="you@business.com"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-message" className="eyebrow text-muted">
              What do you need?
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              className="rounded-lg border border-ink bg-surface px-4 py-3 text-ink placeholder:text-muted/60"
              placeholder="We run 12 short-let apartments in Lekki. Our site gets visits but no bookings."
            />
          </div>
          <button
            type="submit"
            className="on-accent mt-1 w-fit rounded-full bg-accent px-7 py-3 font-semibold text-ink transition-colors hover:bg-accent-hover"
          >
            Send message
          </button>
          <p className="eyebrow leading-relaxed text-muted">
            Form not working? Email me directly:{" "}
            <a
              href={EMAIL_URL}
              className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-hover"
            >
              [AKAKA-EMAIL]
            </a>
          </p>
        </form>

        <div>
          <p className="eyebrow text-muted">Or just say hi</p>
          <div className="mt-4 grid content-start gap-2.5">
            {CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="flex items-center justify-between gap-4 rounded-xl border border-ink bg-surface px-5 py-3.5 transition-colors hover:bg-accent-tint"
              >
                <span className="eyebrow text-muted">{channel.label}</span>
                <span className="text-right text-sm font-medium text-ink">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
          <p className="eyebrow mt-4 leading-relaxed text-muted">
            Whichever channel you pick, you get me — not a form queue.
          </p>
        </div>
      </div>
    </section>
  );
}
