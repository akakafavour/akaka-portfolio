/**
 * Shared project data for the work grid and the individual project pages
 * (app/work/[slug]). Copy is honest: real facts only, no invented metrics.
 * Extra gallery screenshots degrade gracefully when not yet staged.
 */
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
  highlights: string[];
  gallery: { src: string; alt: string }[];
  showTeardown?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "vartex-architects",
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
    highlights: [
      "Design and build in Next.js 15 with Sanity CMS",
      "GSAP motion and page transitions",
      "Copywriting for every section",
      "SEO foundations + Google Business Profile",
      "Resend email + client handoff docs",
    ],
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
    showTeardown: true,
  },
  {
    slug: "orji-munachi",
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

export function getNextProject(slug: string): Project {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}
