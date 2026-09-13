/**
 * Shared project data for the work grid (components/Work.tsx) and the
 * individual project pages (app/work/[slug]). Copy is honest: real facts
 * only, no invented metrics. [AKAKA: …] blocks stay visible until Akaka
 * fills them from a real call. Extra gallery screenshots render only if
 * the files are staged (placeholder-tolerant <img> in the page template).
 */
export type ProjectSection = { heading: string; text: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  outcome: string;
  url: string;
  urlLabel: string;
  image: string;
  imageAlt: string;
  stack: string[];
  overview: string[];
  sections: ProjectSection[];
  highlights: string[];
  /** Vartex only: the Problem → Fix → Result teardown, Akaka's side pending */
  teardown?: { problem: string; fix: string; result: string };
  gallery: { src: string; alt: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "vartex",
    name: "Vartex Architects",
    category: "Client Site / Next.js 15 · Sanity CMS · GSAP",
    outcome:
      "Full digital presence from scratch: design, development, copywriting, SEO, Google Business Profile.",
    url: "https://vartexarchitects.com",
    urlLabel: "vartexarchitects.com",
    image: "/work/vartex-hero.png",
    imageAlt: "Screenshot of the Vartex Architects website homepage",
    stack: ["Next.js 15", "Sanity CMS", "GSAP", "Resend", "Tailwind v4"],
    overview: [
      "Full digital presence from scratch for a Nigerian architecture studio: design, development, copywriting, SEO and Google Business Profile.",
      "The site presents their four services — architectural design, interior design, landscaping, urban planning — alongside live projects (THE HAVEN, NKA NA UZU, THE CORINTHIAN) and their three-step process, Conception → Schematic Design → Realization.",
    ],
    sections: [
      {
        heading: "The brief",
        text: "Vartex Architects needed a digital presence built from zero — one place that could carry the studio's services, projects and process, and make contacting them effortless.",
      },
      {
        heading: "Design and build",
        text: "Designed and built in Next.js 15 with Sanity CMS, so the studio can update projects and content themselves. GSAP motion and page transitions keep the site feeling considered, not decorated.",
      },
      {
        heading: "Copy and findability",
        text: "Every section of copy is written, the SEO foundations are set, and the studio's Google Business Profile is live. Resend handles the contact email, and handoff docs cover everything the client needs to run the site day to day.",
      },
    ],
    highlights: [
      "Design and build in Next.js 15 with Sanity CMS",
      "GSAP motion and page transitions",
      "Copywriting for every section",
      "SEO foundations + Google Business Profile",
      "Resend email + client handoff docs",
    ],
    teardown: {
      problem: "[AKAKA: what did the client need?]",
      fix: "[AKAKA: what did you build?]",
      result: "[AKAKA: what changed?]",
    },
    gallery: [
      {
        src: "/work/vartex-2.png",
        alt: "Vartex Architects website — services section",
      },
      {
        src: "/work/vartex-3.png",
        alt: "Vartex Architects website — project page",
      },
    ],
  },
  {
    slug: "munachi",
    name: "Orji Munachi",
    category: "Client Site / Next.js · TypeScript",
    outcome:
      "Portfolio and brand site for a social media strategist — built to convert visitors into client inquiries.",
    url: "https://munachi-portfolio.vercel.app/",
    urlLabel: "munachi-portfolio.vercel.app",
    image: "/work/munachi-hero.png",
    imageAlt: "Screenshot of Orji Munachi's portfolio website homepage",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    overview: [
      "Portfolio and brand site for a social media strategist — built to convert visitors into client inquiries.",
      "The structure puts proof of work first, keeps the offer one scroll away, and ends every section at a direct contact point.",
    ],
    sections: [
      {
        heading: "The brief",
        text: "Orji Munachi is a social media strategist who needed more than a resume page — a portfolio that turns visitors into client inquiries.",
      },
      {
        heading: "Positioning first",
        text: "Before any design, the page structure: proof of work up front, the offer one scroll away, and every section ending at a direct contact point.",
      },
      {
        heading: "Build and deploy",
        text: "Built in Next.js and TypeScript, mobile-first so it loads fast on slow networks, and deployed on Vercel.",
      },
    ],
    highlights: [
      "Personal-brand positioning and page structure",
      "Design and build in Next.js and TypeScript",
      "Mobile-first, fast on slow networks",
      "Deployed on Vercel",
    ],
    gallery: [
      {
        src: "/work/munachi-2.png",
        alt: "Orji Munachi portfolio — work section",
      },
    ],
  },
  {
    slug: "oivs",
    name: "OIVS — OKWU URRATA Identification & Voting System",
    category: "Full-Stack Concept / Registration · Identity · Verified Voting",
    outcome:
      "Full-stack civic concept: automated member registration, digital identity, verified one-person-one-vote elections.",
    url: "https://oivs-institutional.vercel.app",
    urlLabel: "oivs-institutional.vercel.app",
    image: "/work/oivs-hero.png",
    imageAlt: "Screenshot of the OIVS institutional web application",
    stack: ["Next.js", "Supabase-class backend", "Auth"],
    overview: [
      "A full-stack civic concept built for my community: automated member registration, digital identity, and verified one-person-one-vote elections.",
      "Designed, coded and deployed end-to-end by one person — the same AI-accelerated pipeline that ships client work.",
    ],
    sections: [
      {
        heading: "The idea",
        text: "OKWU URRATA Identification & Voting System: a full-stack civic concept for my community — one system for membership, identity and elections.",
      },
      {
        heading: "What it does",
        text: "Members register through an automated flow, receive a digital identity, and vote in verified elections where one person is one vote.",
      },
      {
        heading: "One person, end to end",
        text: "Designed, coded and deployed solo — the same pipeline I use to ship client work, from first screen to live URL.",
      },
    ],
    highlights: [
      "Automated member registration flow",
      "Digital identity for every member",
      "Verified one-person-one-vote elections",
      "Supabase-class backend with auth",
    ],
    gallery: [
      {
        src: "/work/oivs-2.png",
        alt: "OIVS — verification dashboard",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}

export function getPrevProject(slug: string): Project {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
}
