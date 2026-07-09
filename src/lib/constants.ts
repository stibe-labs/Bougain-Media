export const siteConfig = {
  name: "Bougain Mediaa",
  tagline: "Your growth, our grind.",
  description:
    "Digital marketing agency built around storytelling, strategy, and helping businesses grow in the digital world.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const contact = {
  email: "mediaabougain@gmail.com",
  phone: "+91 8138-869120",
  phoneHref: "tel:+918138869120",
  whatsapp: "+91 8138-869120",
  whatsappHref: "https://wa.me/918138869120",
  responseTime: "Usually within 2 hours",
  businessHours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  office: "Kerala, India",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Kerala,+India&output=embed",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  brand: "Bougain Mediaa",
  headline: ["Your", "Growth.", "Our", "Grind."],
  subheadline:
    "We blend strategy, storytelling, performance marketing, AI automation, and web experiences to help ambitious brands grow.",
  primaryCta: "Start a Conversation",
  secondaryCta: "View Our Work",
};

export const about = {
  label: "About Us",
  headline: "Marketing that means something",
  intro:
    "We're Bougain Mediaa — thinkers, creators, and problem-solvers who believe marketing should be meaningful, not just measurable.",
  extended:
    "The digital landscape shifts fast. Whether you need visibility, qualified leads, or a brand that resonates — our focus is always on results that matter.",
  consultation:
    "We'd love to learn about your business. Start with a free consultation and get a feel for who we are.",
  closing: "Looking forward to connecting.",
  mission:
    "To deliver tailored, data-driven strategies that help brands connect, engage, and thrive online.",
  vision:
    "To make marketing meaningful — where creativity meets measurable results.",
  values: [
    {
      title: "Story first",
      description: "Every campaign begins with a narrative people care about.",
    },
    {
      title: "Clarity over noise",
      description: "Fewer moves, sharper decisions, measurable progress.",
    },
    {
      title: "Human craft",
      description: "Strategy shaped by people, refined by data — never the reverse.",
    },
  ],
  timeline: [
    {
      year: "01",
      title: "Listen deeply",
      description: "We learn your brand, audience, and the real business problem.",
    },
    {
      year: "02",
      title: "Shape the narrative",
      description: "Positioning, messaging, and creative direction built to last.",
    },
    {
      year: "03",
      title: "Activate channels",
      description: "Paid, organic, and owned media working as one system.",
    },
    {
      year: "04",
      title: "Measure & refine",
      description: "Transparent reporting and continuous optimization.",
    },
  ],
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
  headline: "Services",
  subtitle:
    "Helping ambitious brands grow through strategy, creativity & digital experiences.",
  items: [
    {
      title: "Content Creation",
      description:
        "Creative concepts and branded content designed to tell your story clearly.",
      tag: "Creative",
      image: "/images/sevices/content creation.png",
      features: [
        "Content strategy and ideation",
        "Brand-first copy and captions",
        "Platform-ready creative assets",
      ],
      stats: [
        { value: "1.2K+", label: "Assets Created" },
        { value: "40+", label: "Brand Systems" },
        { value: "98%", label: "Client Retention" },
      ],
    },
    {
      title: "Video Production",
      description:
        "End-to-end video production for campaigns, social content, and branded storytelling.",
      tag: "Video",
      image: "/images/sevices/video production.png",
      features: [
        "Creative direction and scripting",
        "Shoot planning and production",
        "Editing, motion, and delivery",
      ],
      stats: [
        { value: "300+", label: "Videos Produced" },
        { value: "50+", label: "Campaign Films" },
        { value: "95%", label: "On-Time Delivery" },
      ],
    },
    {
      title: "Visual Ads",
      description:
        "High-impact ad creatives crafted to stop the scroll and drive action.",
      tag: "Design",
      image: "/images/sevices/visualadss.png",
      features: [
        "Static and motion ad creatives",
        "Multi-format ad variants",
        "Creative testing support",
      ],
      stats: [
        { value: "900+", label: "Ad Creatives" },
        { value: "120+", label: "Campaign Sets" },
        { value: "3.9×", label: "CTR Lift" },
      ],
    },
    {
      title: "Social Media Management",
      description:
        "Consistent social presence through strategy, posting, and audience engagement.",
      tag: "Social",
      image: "/images/sevices/social media management.png",
      features: [
        "Monthly social media planning",
        "Content calendar and publishing",
        "Community management",
      ],
      stats: [
        { value: "180+", label: "Accounts Managed" },
        { value: "2M+", label: "Audience Reach" },
        { value: "4.8×", label: "Engagement Lift" },
      ],
    },
    {
      title: "Brand Shoots",
      description:
        "Professional photo and video shoots that elevate your brand identity.",
      tag: "Branding",
      image: "/images/sevices/brand shoots.png",
      features: [
        "Concept and moodboard planning",
        "On-location or studio shoots",
        "Brand-ready media selection",
      ],
      stats: [
        { value: "120+", label: "Brand Shoots" },
        { value: "2.5K+", label: "Final Visuals" },
        { value: "96%", label: "Client Satisfaction" },
      ],
    },
    {
      title: "Performance Marketing",
      description:
        "Data-driven paid and retention campaigns focused on conversions and measurable growth.",
      tag: "Paid Growth",
      image: "/images/sevices/perfomance marketing.png",
      features: [
        "Meta Ads",
        "Google Ads",
        "WhatsApp Campaigns",
        "Email Marketing",
      ],
      stats: [
        { value: "250+", label: "Campaigns" },
        { value: "500M+", label: "Reach" },
        { value: "3.2×", label: "Avg. ROAS" },
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
  headline: "Selected Work",
  subtitle: "Campaigns, content, and digital experiences crafted for real brands.",
  items: [
    {
      title: "Brand Campaign",
      category: "Social Media",
      industry: "Lifestyle",
      result: "4.8× engagement lift across channels",
      image: "/images/portfolio-social.png",
      span: "lg" as const,
    },
    {
      title: "Product Launch",
      category: "Content Creation",
      industry: "Consumer",
      result: "National awareness in 6 weeks",
      image: "/images/portfolio-product.png",
      span: "sm" as const,
    },
    {
      title: "SEO Growth",
      category: "SEO",
      industry: "SaaS",
      result: "3× organic traffic in 9 months",
      image: "/images/portfolio-seo.png",
      span: "sm" as const,
    },
    {
      title: "PPC Drive",
      category: "Advertising",
      industry: "E-commerce",
      result: "3.2× average ROAS",
      image: "/images/portfolio-ppc.png",
      span: "md" as const,
    },
    {
      title: "Web Redesign",
      category: "Web Development",
      industry: "Services",
      result: "2.1× conversion rate lift",
      image: "/images/portfolio-web.png",
      span: "md" as const,
    },
    {
      title: "Email Series",
      category: "Email Marketing",
      industry: "Retail",
      result: "42% average open rate",
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
  iconGreen: "/logos/BM%20LOGO%20icon%20G-01.png",
  iconWhite: "/logos/BM%20LOGO%20Icon%20W-01-01.png",
};

export const ctaBand = {
  headline: "Ready to grow?",
  subheadline: "Get a free consultation and let's build something great together.",
};

export const contactSection = {
  headline: "Let's make something exceptional",
  supporting:
    "Tell us about your brand. We'll respond personally — usually within a few hours.",
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
    subheadline:
      "Send us your resume — we're always interested in meeting talented people.",
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
