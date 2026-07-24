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

export const portfolioCategories = [
  "All",
  "Hospitality & Events",
  "Real Estate & Interiors",
  "Fitness & Lifestyle",
  "EdTech & Tech",
  "Food & Brand Shoots",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  type: "video" | "photo";
  industry: string;
  result: string;
  description: string;
  image: string;
  videoSrc?: string;
  aspect?: "16:9" | "9:16" | "4:3";
  span: "lg" | "sm" | "md";
  featured?: boolean;
}

export const portfolio: {
  label: string;
  headline: string;
  subtitle: string;
  items: PortfolioItem[];
} = {
  label: "Work We're Proud Of",
  headline: "Selected Work in Motion & Print",
  subtitle: "Campaign films, video reels, brand shoots, and high-impact digital experiences.",
  items: [
    {
      id: "turnup-aftermovie",
      title: "Crown Plaza Turn Up Aftermovie",
      client: "Crowne Plaza Hotels",
      category: "Hospitality & Events" as PortfolioCategory,
      type: "video" as const,
      industry: "Luxury Hospitality",
      result: "1.8M+ video impressions across platforms",
      description: "High-energy event aftermovie and visual storytelling for Crowne Plaza's flagship summer festival.",
      image: "/images/portfolio-social.png",
      videoSrc: "/videos/TURNUP AFTERMOVIE.mp4",
      aspect: "16:9" as const,
      span: "lg" as const,
      featured: true,
    },
    {
      id: "crown-plaza-turnup",
      title: "Crown Plaza Festival Promo",
      client: "Crowne Plaza Hotels",
      category: "Hospitality & Events" as PortfolioCategory,
      type: "video" as const,
      industry: "Luxury Hospitality",
      result: "850K+ organic views & ticket sell-out",
      description: "Cinematic commercial reel capturing luxury ambiance, live music, and party energy.",
      image: "/images/portfolio-email.png",
      videoSrc: "/videos/TURN UP CROWN PLAZA.mp4",
      aspect: "16:9" as const,
      span: "md" as const,
      featured: true,
    },
    {
      id: "emarath-interior",
      title: "Emarath Architectural Showcase",
      client: "Emarath Interiors",
      category: "Real Estate & Interiors" as PortfolioCategory,
      type: "video" as const,
      industry: "Interior Architecture",
      result: "3.4× increase in qualified luxury inquiries",
      description: "Cinematic interior walkthrough showcasing modern Scandinavian aesthetics and premium craftsmanship.",
      image: "/images/portfolio-product.png",
      videoSrc: "/videos/Emarath Interior Finalll Draft_preview.mp4",
      aspect: "16:9" as const,
      span: "md" as const,
      featured: true,
    },
    {
      id: "got-emarath",
      title: "GOT Emarath Interior Film",
      client: "Emarath Interiors",
      category: "Real Estate & Interiors" as PortfolioCategory,
      type: "video" as const,
      industry: "Real Estate & Architecture",
      result: "National design recognition & feature",
      description: "Full-length interior design documentary capturing space planning, textures, and ambient lighting.",
      image: "/images/portfolio-web.png",
      videoSrc: "/videos/GOT emarath_1.mp4",
      aspect: "16:9" as const,
      span: "lg" as const,
      featured: false,
    },
    {
      id: "fit-co-reel-1",
      title: "Fit & Co Brand Launch Reel",
      client: "Fit & Co Gyms",
      category: "Fitness & Lifestyle" as PortfolioCategory,
      type: "video" as const,
      industry: "Fitness & Health",
      result: "4.8× engagement lift on Instagram Reels",
      description: "Fast-paced mobile reel engineered for maximum scroll-stopping engagement and membership conversions.",
      image: "/images/portfolio-seo.png",
      videoSrc: "/videos/Fit&Co Reel 1.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: true,
    },
    {
      id: "fit-co-reel-2",
      title: "Fit & Co High-Intensity Reel",
      client: "Fit & Co Gyms",
      category: "Fitness & Lifestyle" as PortfolioCategory,
      type: "video" as const,
      industry: "Fitness & Health",
      result: "320K+ views on Instagram & Shorts",
      description: "Dynamic workout reel highlighting trainer sessions, high-energy beats, and community vibes.",
      image: "/images/portfolio-ppc.png",
      videoSrc: "/videos/REEL 2 FitGo.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: false,
    },
    {
      id: "godha-reel",
      title: "Godha Fitness Action Film",
      client: "Godha Fitness",
      category: "Fitness & Lifestyle" as PortfolioCategory,
      type: "video" as const,
      industry: "Sports & Athletics",
      result: "5.2× reach lift among fitness enthusiasts",
      description: "Raw cinematic edit focusing on athletic strength, endurance, and brand identity.",
      image: "/images/portfolio-social.png",
      videoSrc: "/videos/godha reel final.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: false,
    },
    {
      id: "chefs-kiss",
      title: "Chef's Kiss Culinary Story",
      client: "Chef's Kiss Dining",
      category: "Food & Brand Shoots" as PortfolioCategory,
      type: "video" as const,
      industry: "Culinary & Dining",
      result: "250K+ organic views in 14 days",
      description: "Sensory food cinematography capturing artisanal prep, plating perfection, and kitchen atmosphere.",
      image: "/images/portfolio-ppc.png",
      videoSrc: "/videos/chefs kiss_FINAL OUT.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: true,
    },
    {
      id: "boss-reel",
      title: "Boss Brand Commercial",
      client: "Boss Wear & Lifestyle",
      category: "Food & Brand Shoots" as PortfolioCategory,
      type: "video" as const,
      industry: "Apparel & Lifestyle",
      result: "420K+ campaign reach across South India",
      description: "Commercial film blending street culture aesthetics with sleek high-fashion product videography.",
      image: "/images/portfolio-web.png",
      videoSrc: "/videos/BOSS REEL_FINAL.mp4",
      aspect: "16:9" as const,
      span: "lg" as const,
      featured: true,
    },
    {
      id: "aicademy-promo",
      title: "Aicademy Future Learning",
      client: "Aicademy Global",
      category: "EdTech & Tech" as PortfolioCategory,
      type: "video" as const,
      industry: "EdTech",
      result: "2.1× signup conversion rate lift",
      description: "Modern promotional video highlighting AI-powered education and interactive learning paths.",
      image: "/images/portfolio-email.png",
      videoSrc: "/videos/Aicademy New Reel.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: false,
    },
    {
      id: "getwork-app",
      title: "GetWork Platform Launch",
      client: "GetWork App",
      category: "EdTech & Tech" as PortfolioCategory,
      type: "video" as const,
      industry: "SaaS & Tech",
      result: "180K+ app install impressions",
      description: "Sleek motion graphics and video ad showcasing seamless user workflow and career matching.",
      image: "/images/portfolio-product.png",
      videoSrc: "/videos/Getwork Vid Fdraft 2.mp4",
      aspect: "16:9" as const,
      span: "md" as const,
      featured: false,
    },
    {
      id: "keyboard-reel",
      title: "Tech Gadget Product Reel",
      client: "Tech Brand Lab",
      category: "EdTech & Tech" as PortfolioCategory,
      type: "video" as const,
      industry: "Consumer Electronics",
      result: "3.9× CTR lift on product ads",
      description: "Close-up macro product video emphasizing tactile switches, RGB lighting, and build precision.",
      image: "/images/portfolio-seo.png",
      videoSrc: "/videos/keyboard reel final draftt.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: false,
    },
    {
      id: "happy-campaign",
      title: "Happy Brand Event Film",
      client: "Happy Media",
      category: "Hospitality & Events" as PortfolioCategory,
      type: "video" as const,
      industry: "Entertainment",
      result: "500K+ cross-platform views",
      description: "Vibrant event campaign film showcasing celebratory moments, crowd energy, and festival visuals.",
      image: "/images/portfolio-social.png",
      videoSrc: "/videos/HAPPY_2.mp4",
      aspect: "16:9" as const,
      span: "md" as const,
      featured: false,
    },
    {
      id: "picha-narrative",
      title: "Picha Brand Narrative Film",
      client: "Picha Studios",
      category: "Food & Brand Shoots" as PortfolioCategory,
      type: "video" as const,
      industry: "Brand Film",
      result: "Featured storytelling award winner",
      description: "Cinematic story-driven brand film blending deep character narrative with rich visual tone.",
      image: "/images/portfolio-product.png",
      videoSrc: "/videos/PICHA FINAL OUT.mp4",
      aspect: "16:9" as const,
      span: "lg" as const,
      featured: true,
    },
    {
      id: "revathy-reel",
      title: "Revathy Creator & Lifestyle Reel",
      client: "Revathy Media",
      category: "Fitness & Lifestyle" as PortfolioCategory,
      type: "video" as const,
      industry: "Personal Brand & Fashion",
      result: "92K+ organic impressions",
      description: "Minimalist fashion aesthetic reel focused on personal branding and social engagement.",
      image: "/images/portfolio-seo.png",
      videoSrc: "/videos/Revathy Reel 1Draft.mp4",
      aspect: "9:16" as const,
      span: "sm" as const,
      featured: false,
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
