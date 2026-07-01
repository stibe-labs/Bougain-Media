export const siteConfig = {
  name: "Bougain Mediaa",
  tagline: "Big ideas. Bigger Results.",
  description:
    "Digital marketing agency built around storytelling, strategy, and helping businesses grow in the digital world.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const contact = {
  email: "mediaabougain@gmail.com",
  phone: "+91 8138-869120",
  phoneHref: "tel:+918138869120",
  whatsapp: "+91 97787-37896",
  whatsappHref: "https://wa.me/919778737896",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  headline: ["Big ideas.", "Bigger", "Results."],
  subheadline:
    "We blend storytelling, strategy, and data-driven marketing to help your business grow in the digital world.",
  primaryCta: "Get a Free Consultation",
  secondaryCta: "View Our Services",
};

export const about = {
  label: "About Us",
  headline: "Marketing that means something",
  intro:
    "We're Bougain Mediaa — a digital marketing agency built around storytelling, strategy, and helping businesses truly grow in the digital world. We're thinkers, creators, and problem-solvers who believe marketing should be meaningful — not just about metrics.",
  extended:
    "We know the digital landscape shifts fast — and we're here to help you stay one step ahead. Whether you're trying to increase visibility, generate qualified leads, or build a brand that resonates, our focus is always on results that matter.",
  consultation:
    "We'd love to learn more about your business and explore how we can support your goals. Let's start with a free consultation — feel free to reach out anytime to get a feel for who we are and what we do.",
  closing: "Thanks for considering us. We're looking forward to connecting.",
  cards: [
    {
      title: "Our Story",
      content:
        "A digital marketing agency built around storytelling, strategy, and real business growth.",
    },
    {
      title: "Mission",
      content:
        "To deliver tailored, data-driven strategies that help brands connect, engage, and thrive online.",
    },
    {
      title: "Vision",
      content:
        "To make marketing meaningful — where creativity meets measurable results.",
    },
  ],
};

export const services = {
  label: "What We Do",
  headlineScript: "our",
  headline: "SERVICES",
  subtitle: "Six ways we help brands win online",
  items: [
    {
      title: "ppc advertising management",
      description:
        "Paid campaigns across Google, Meta, and more — optimized for ROI.",
      tag: "Paid Media",
      features: [
        "Google & Meta campaign setup",
        "Audience targeting & retargeting",
        "Conversion tracking & optimization",
        "Transparent performance reports",
      ],
    },
    {
      title: "content creation",
      description:
        "Visual and written content that tells your brand story.",
      tag: "Creative",
      features: [
        "Brand-aligned copywriting",
        "Social & ad creative assets",
        "Video & graphic production",
        "Content calendars & planning",
      ],
    },
    {
      title: "social media management",
      description:
        "Strategy, posting, and community growth across platforms.",
      tag: "Social",
      features: [
        "Platform-specific strategies",
        "Daily posting & scheduling",
        "Community engagement",
        "Analytics & growth tracking",
      ],
    },
    {
      title: "website maintenance & development",
      description:
        "Fast, modern websites that convert visitors into customers.",
      tag: "Web",
      features: [
        "Custom design & development",
        "Speed & mobile optimization",
        "Ongoing maintenance & updates",
        "SEO-ready architecture",
      ],
    },
    {
      title: "seo services",
      description:
        "Organic visibility that brings qualified traffic over time.",
      tag: "Organic",
      features: [
        "Keyword & competitor research",
        "On-page & technical SEO",
        "Content optimization",
        "Ranking & traffic reports",
      ],
    },
    {
      title: "email marketing",
      description:
        "Nurture leads and retain customers with targeted email campaigns.",
      tag: "Email",
      features: [
        "List building & segmentation",
        "Automated drip sequences",
        "Newsletter design & copy",
        "Open rate & ROI tracking",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Discover",
      description: "We learn your goals, audience, and competitive landscape.",
    },
    {
      step: "02",
      title: "Strategize",
      description: "A tailored plan built around measurable outcomes.",
    },
    {
      step: "03",
      title: "Deliver",
      description: "Execute, optimize, and report — so you see real growth.",
    },
  ],
};

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 1, suffix: "M+", label: "Social Reach" },
  { value: 100, suffix: "+", label: "Campaigns Run" },
];

export const portfolio = {
  label: "Work We're Proud Of",
  headline: "Projects We've Delivered",
  items: [
    {
      title: "Brand Campaign",
      category: "Social Media",
      image: "/images/portfolio-social.png",
      span: "lg" as const,
    },
    {
      title: "Product Launch",
      category: "Content Creation",
      image: "/images/portfolio-product.png",
      span: "sm" as const,
    },
    {
      title: "SEO Growth",
      category: "SEO",
      image: "/images/portfolio-seo.png",
      span: "sm" as const,
    },
    {
      title: "PPC Drive",
      category: "Advertising",
      image: "/images/portfolio-ppc.png",
      span: "md" as const,
    },
    {
      title: "Web Redesign",
      category: "Web Development",
      image: "/images/portfolio-web.png",
      span: "md" as const,
    },
    {
      title: "Email Series",
      category: "Email Marketing",
      image: "/images/portfolio-email.png",
      span: "md" as const,
    },
  ],
};

export const images = {
  hero: "/images/hero-bg.png",
  about: "/images/about-team.png",
  careers: "/images/careers-team.png",
  cta: "/images/cta-bg.png",
};

export const logos = {
  fullGreen: "/logos/logo-full-green.png",
  fullWhite: "/logos/logo-full-white.png",
  iconGreen: "/logos/logo-icon-green.png",
  iconWhite: "/logos/logo-icon-white.png",
};

export const ctaBand = {
  headline: "Ready to grow?",
  subheadline: "Get a free consultation and let's build something great together.",
};

export const contactSection = {
  headline: "CONTACT US",
  supporting:
    "Reach out to our dedicated team for any inquiries, assistance, or information you need.",
};

export const careers = {
  headline: "Join Our Team",
  subheadline:
    "We're thinkers, creators, and problem-solvers. If you're passionate about digital marketing and want to do meaningful work, we'd love to hear from you.",
  emptyState:
    "We don't have any open positions right now — but we're always interested in meeting talented people. Send your resume to mediaabougain@gmail.com and we'll keep you in mind.",
  whyJoin: [
    {
      title: "Creative Work",
      description: "Work on diverse brands and campaigns that make a real impact.",
    },
    {
      title: "Growth Culture",
      description: "Learn fast, experiment boldly, and level up your skills.",
    },
    {
      title: "Meaningful Impact",
      description: "Marketing that matters — not just vanity metrics.",
    },
  ],
  filters: ["All", "Full-time", "Remote", "Part-time", "Internship"],
  ctaBand: {
    headline: "Don't see a fit?",
    subheadline: "Send us your resume — we're always interested in meeting talented people.",
  },
};

export const footer = {
  quickLinks: navLinks,
  supportLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Get a Quote", href: "/contact" },
  ],
  copyright: `© ${new Date().getFullYear()} Bougain Mediaa. All rights reserved.`,
};
