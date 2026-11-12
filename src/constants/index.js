export const myProjects = [
  {
    id: 7,
    title: "MedViz – Medical AI Diagnostic & Visualization Suite",
    description:
      "AI-powered medical intelligence platform that transforms blood reports, radiology, ECGs, and health data into visual, multilingual, and easy-to-understand health insights using Google Gemini.",
    subDescription: [
      "Built a multimodal medical intelligence platform using React 19, TypeScript, Tailwind CSS, and Google Gemini models.",
      "Integrated Gemini 3.1 Pro for medical document analysis, biomarker extraction, structured JSON generation, health-gap analysis, and personalized insights.",
      "Implemented multimodal document ingestion supporting medical PDFs, images, handwritten notes, camera scanning, and manual health data entry.",
      "Developed an interactive anatomical body map that visually connects abnormal biomarkers with relevant organs and body regions.",
      "Created a Health Index dashboard with 0-100 scoring, biomarker status breakdowns, BMI calculation, and current-vs-target health comparisons.",
      "Added AI-generated easy explanations that translate complex medical terminology into understandable patient-friendly narratives.",
      "Implemented multilingual AI insights supporting English, Hindi, Marathi, Spanish, French, and additional languages.",
      "Integrated Gemini 2.5 Flash TTS to convert AI-generated medical explanations into natural voice narration.",
      "Built a personalized health context layer using age, gender, height, and weight to generate contextualized health targets and insights.",
      "Added AI-generated action plans that help users prepare relevant questions for discussions with healthcare professionals.",
      "Integrated Supabase for application data and designed privacy-focused ephemeral processing for sensitive medical documents.",
      "Implemented browser-based document scanning using the MediaDevices API for mobile-friendly medical report capture.",
    ],
    href: "https://medwiz-alpha.vercel.app/",
    logo: "",
    image: "/assets/projects/project-9.png",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "Google Gemini",
        path: "/assets/logos/gemini.svg",
      },
      {
        id: 4,
        name: "AI / LLM",
        path: "/assets/logos/ai.svg",
      },
      {
        id: 5,
        name: "Supabase",
        path: "/assets/logos/supabase.svg",
      },
      {
        id: 6,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 7,
        name: "TTS",
        path: "/assets/logos/ai.svg",
      },
      {
        id: 8,
        name: "MediaDevices API",
        path: "/assets/logos/react.svg",
      },
    ],
  },
  {
    id: 1,
    title: "FormPilot – Full-Stack Form Submission SaaS",
    description:
      "Form-management SaaS handling 100+ daily submissions: JWT auth with refresh tokens, Redis caching & rate limiting, webhooks, spam detection, SendGrid email alerts, and a real-time analytics dashboard.",
    subDescription: [
      "Form-management SaaS handling 100+ daily submissions with end-to-end automated processing.",
      "Built with Next.js, Node.js, and TypeScript for high performance, type safety, and scalability.",
      "PostgreSQL primary database with Redis caching layer and rate limiting for API resilience.",
      "Secure JWT authentication with refresh token rotation and role-based permissions.",
      "ML-powered spam protection, webhooks, SendGrid email notifications, and automated lead capture.",
      "Interactive analytics dashboard for viewing submissions and exporting data (CSV/JSON).",
      "Deployed on Vercel with automated GitHub Actions CI/CD workflows.",
    ],
    href: "https://form-pilot-v.vercel.app/",
    logo: "",
    image: "/assets/projects/project-6.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "Node.js",
        path: "/assets/logos/nodejs.svg",
      },
      {
        id: 4,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 5,
        name: "Redis",
        path: "/assets/logos/redis.svg",
      },
      {
        id: 6,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 7,
        name: "CI/CD",
        path: "/assets/logos/cicd.svg",
      },
      {
        id: 8,
        name: "Vercel",
        path: "/assets/logos/vercel.svg",
      },
    ],
  },
  {
    id: 2,
    title: "TradeX – Paper Trading Platform",
    description:
      "Paper-trading simulator for Indian stock and options markets with real-time option chains, Greeks (Delta, Theta, Gamma, Vega), lot-based trading and ₹10L virtual capital, with 800ms live price updates.",
    subDescription: [
      "High-performance paper trading simulator built with Next.js 15, TypeScript, and React 19.",
      "Zustand state management handles complex trading logic with 800ms interval live price updates.",
      "Real-time option chains with full Greeks calculations (Delta, Theta, Gamma, Vega, IV) and lot-based trading.",
      "AI Trading Psychometrician analyzes journal entries and detects cognitive psychology patterns.",
      "Strategy Backtester on historical data and Risk Manager with circuit breakers for automatic account protection.",
      "TradingView charts, Yahoo Finance real-time feeds, and social leaderboard in an installable PWA with offline support.",
      "Portfolio management with ₹10L starting virtual balance, live P&L tracking, and full order book.",
    ],
    href: "https://trade-x-paper-trading-app.vercel.app/",
    logo: "",
    image: "/assets/projects/TradeX-Paper-Trading.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "Zustand",
        path: "/assets/logos/zustand.svg",
      },
      {
        id: 4,
        name: "TradingView",
        path: "/assets/logos/tradingview.svg",
      },
      {
        id: 5,
        name: "Recharts",
        path: "/assets/logos/recharts.svg",
      },
      {
        id: 6,
        name: "PWA",
        path: "/assets/logos/pwa.svg",
      },
      {
        id: 7,
        name: "Supabase",
        path: "/assets/logos/supabase.svg",
      },
      {
        id: 8,
        name: "AI Analytics",
        path: "/assets/logos/ai.svg",
      },
    ],
  },
  {
    id: 3,
    title: "RailGaadi – Live Indian Train Tracking Platform",
    description:
      "Real-time Indian train tracking platform with interactive MapLibre maps, 30-second live updates, station-wise ETA and delays, weather, terrain, and elevation analytics with resilient API fallbacks.",
    subDescription: [
      "Built a mobile-friendly live train tracking platform using Next.js 14, React 18, TypeScript, and Tailwind CSS.",
      "Integrated RailRadar APIs to provide train search, live journey status, route geometry, station progress, ETA, delays, and platform information.",
      "Implemented interactive MapLibre GL maps with live train positions, station markers, route paths, and map-based journey visualization.",
      "Used TanStack Query for automatic 30-second polling and efficient server-state synchronization of live journey data.",
      "Integrated OpenWeather and OpenTopography APIs to display station weather conditions and elevation profiles along the train route.",
      "Added Overpass API and OpenStreetMap data for terrain information and nearby route features.",
      "Designed graceful fallback mechanisms with generated journey, weather, terrain, and elevation data when external APIs are unavailable.",
      "Implemented Zustand persistence for favorite trains and recent searches using browser local storage.",
      "Added dedicated train journey, favorites, and shareable public journey pages with responsive mobile-first UI.",
      "Implemented in-memory API caching to reduce repeated external API requests and improve application responsiveness.",
    ],
    href: "https://railgadi.vercel.app/",
    logo: "",
    image: "/assets/projects/project-8.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "MapLibre GL",
        path: "/assets/logos/react.svg",
      },
      {
        id: 4,
        name: "TanStack Query",
        path: "/assets/logos/react.svg",
      },
      {
        id: 5,
        name: "Zustand",
        path: "/assets/logos/zustand.svg",
      },
      {
        id: 6,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 7,
        name: "RailRadar API",
        path: "/assets/logos/api.svg",
      },
      {
        id: 8,
        name: "OpenStreetMap",
        path: "/assets/logos/openstreetmap.svg",
      },
    ],
  },
  ,
  {
    id: 4,
    title: "Frontix – Open Source npm Package",
    description:
      "A modern, lightweight utility toolkit for frontend developers, offering 25+ utilities for string, date, validation, async, and deep object operations. Built with TypeScript (ESM + CJS), tree-shakable, and published on npm.",
    subDescription: [
      "Published on npm with 100% test coverage using Vitest and automated CI/CD via GitHub Actions.",
      "Built with TypeScript and bundled using tsup, ensuring lightweight builds (~2.5KB gzipped).",
      "Supports both ESM and CJS builds for universal compatibility across modern and legacy projects.",
      "Includes utilities like debounce, throttle, deepClone, slugify, validateEmail, formatDate, and retry.",
      "Maintained with semantic versioning, Prettier, and ESLint for enterprise code quality.",
    ],
    href: "https://www.npmjs.com/package/frontix",
    logo: "/assets/logos/npm.svg",
    image: "/assets/projects/project-7.png",
    tags: [
      {
        id: 1,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 2,
        name: "Node.js",
        path: "/assets/logos/nodejs.svg",
      },
      {
        id: 3,
        name: "Vitest",
        path: "/assets/logos/vitest.svg",
      },
      {
        id: 4,
        name: "CI/CD",
        path: "/assets/logos/github-actions.svg",
      },
      {
        id: 5,
        name: "tsup",
        path: "/assets/logos/tsup.svg",
      },
      {
        id: 6,
        name: "npm",
        path: "/assets/logos/npm.svg",
      },
    ],
  },
  // {
  //   id: 5,
  //   title: "Trusty Voice – Testimonial & Feedback System",
  //   description:
  //     "A modern SaaS platform for collecting and showcasing customer testimonials and feedback, featuring AI-powered insights, secure user authentication, and flexible embedding options.",
  //   subDescription: [
  //     "Developed using Next.js 14 with TypeScript for a fast, type-safe, and scalable frontend.",
  //     "Integrated Clerk for secure, passwordless authentication and user management.",
  //     "Built customizable testimonial widgets and embeddable scripts for easy integration into any website.",
  //     "Enabled AI-powered feedback chatbot for automated, real-time sentiment collection.",
  //     "Implemented analytics dashboard to monitor user engagement and testimonial performance.",
  //     "Added Stripe integration for subscription-based billing and plan management.",
  //     "Styled entirely with Tailwind CSS and shipped with full dark mode support.",
  //     "Used Supabase as the backend database with real-time capabilities.",
  //     "Deployed on Vercel with CI/CD and performance optimizations.",
  //   ],
  //   href: "https://trusty-voice.vercel.app/",
  //   logo: "",
  //   image: "/assets/projects/project-5.png",
  //   tags: [
  //     {
  //       id: 1,
  //       name: "Next.js",
  //       path: "/assets/logos/nextjs.svg",
  //     },
  //     {
  //       id: 2,
  //       name: "TypeScript",
  //       path: "/assets/logos/typescript.svg",
  //     },
  //     {
  //       id: 3,
  //       name: "Clerk",
  //       path: "/assets/logos/clerk.svg",
  //     },
  //     {
  //       id: 4,
  //       name: "Supabase",
  //       path: "/assets/logos/supabase.svg",
  //     },
  //     {
  //       id: 5,
  //       name: "Stripe",
  //       path: "/assets/logos/stripe.svg",
  //     },
  //     {
  //       id: 6,
  //       name: "TailwindCSS",
  //       path: "/assets/logos/tailwindcss.svg",
  //     },
  //     {
  //       id: 7,
  //       name: "AI",
  //       path: "/assets/logos/openai.svg",
  //     },
  //     {
  //       id: 8,
  //       name: "Framer Motion",
  //       path: "/assets/logos/framer-motion.svg",
  //     },
  //     {
  //       id: 9,
  //       name: "GSAP",
  //       path: "/assets/logos/gsap.svg",
  //     },
  //     {
  //       id: 10,
  //       name: "shadcn/ui",
  //       path: "/assets/logos/shadcn.svg",
  //     },
  //     {
  //       id: 11,
  //       name: "Recharts",
  //       path: "/assets/logos/recharts.svg",
  //     },
  //   ],
  // },
  {
    id: 5,
    title: "EnvShare – Secure Environment Sharing Tool",
    description:
      "A lightweight and secure tool for sharing environment variables with AES-GCM encryption, auto-expiration, and read limits — all in a privacy-first architecture.",
    subDescription: [
      "Built with Next.js and Tailwind CSS for a fast, responsive, and minimal user interface.",
      "Uses AES-GCM end-to-end encryption to ensure that secrets never leave the browser unencrypted.",
      "Implements secure, shareable links that auto-expire after a set time or number of reads.",
      "Data is stored temporarily using Upstash with serverless Redis for scalable, ephemeral storage.",
      "Client-side only encryption key handling ensures no sensitive data is stored on the server.",
      "Deployed on Vercel with fast build and CI/CD support.",
    ],
    href: "https://envshare-eight-khaki.vercel.app/",
    logo: "",
    image: "/assets/projects/peoject-6.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 3,
        name: "AES-GCM",
        path: "/assets/logos/lock.svg",
      },
      {
        id: 4,
        name: "Upstash",
        path: "/assets/logos/upstash.svg",
      },
      {
        id: 5,
        name: "Vercel",
        path: "/assets/logos/vercel.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Modifio – Free File Converter",
    description:
      "A sleek and powerful online tool for unlimited multimedia file conversions including video, audio, and image formats.",
    subDescription: [
      "Supports drag-and-drop upload for a seamless user experience.",
      "Convert images, videos, and audio files to various formats with ease.",
      "Tabbed dropdown with categorized format selection (Video / Audio).",
      "Batch conversion with modern UI and responsive design.",
      "One-click 'Convert Now' interaction after selecting files and format.",
      "Fully client-side powered by FFmpeg and WebAssembly for enhanced speed and privacy.",
      "Supports conversions: 🎬 Video (MP4, AVI, WebM, MOV), 🎧 Audio (MP3, WAV, AAC, OGG), 🖼️ Image (JPG, PNG, GIF, WEBP).",
    ],

    href: "https://modifioio.netlify.app/",
    logo: "/assets/logos/modifio.svg",
    image: "/assets/projects/project-4.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 3,
        name: "FFmpeg",
        path: "/assets/logos/ffmpeg.svg",
      },
      {
        id: 4,
        name: "WebAssembly",
        path: "/assets/logos/wasm.svg",
      },
      {
        id: 5,
        name: "Shadcn/UI",
        path: "/assets/logos/shadcn.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "Github",
    href: "https://github.com/vishal11u",
    icon: "/assets/socials/github.png",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/vishal1-shitole/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vishal11u",
    icon: "/assets/socials/instagram.svg",
  },
];

export const hackathons = [
  {
    id: 1,
    title: "Autonomous Agent Orchestrator",
    event: "Global AI Sprint Hackathon",
    duration: "36-Hour Sprint",
    role: "Lead Frontend & System Architecture",
    description:
      "Engineered a real-time autonomous AI agent execution canvas with live streaming telemetry, multi-LLM routing, and instant feedback loops.",
    highlights: [
      "Constructed an interactive node graph workbench with zero-latency state synchronization using Zustand.",
      "Integrated streaming responses with fallback failover across OpenAI and Gemini APIs.",
      "Recognized as a Top 5 Finalist among 400+ participating international teams.",
    ],
    award: "🏆 Top 5 Finalist",
    tags: ["Next.js", "TypeScript", "Zustand", "AI Agents", "TailwindCSS"],
    link: "https://github.com/vishal11u",
  },
  {
    id: 2,
    title: "High-Frequency Paper Settlement Engine",
    event: "FinTech Innovation Hack",
    duration: "24-Hour Sprint",
    role: "Full-Stack Developer",
    description:
      "Built an ultra-low-latency mock order-matching engine and real-time options Greeks calculator running directly in the browser.",
    highlights: [
      "Engineered real-time Black-Scholes Greeks computations running on Web Workers without blocking UI thread.",
      "Sub-800ms state updates with TradingView lightweight charting integration.",
      "Best UI & Developer Experience Award winner.",
    ],
    award: "🥇 Best UI Track Winner",
    tags: ["React 19", "TypeScript", "Web Workers", "TradingView", "PWA"],
    link: "https://github.com/vishal11u",
  },
];

export const experiences = [
  {
    title: "Software Developer – Frontend",
    job: "Infusyx Services",
    date: "June 2025 – Present",
    contents: [
      "🚀 Took Full Ownership of education & admissions SaaS platforms (University & Fees Management, CourseFinder, Application Portal, CRM) as primary developer from requirements to production.",
      "⚡ Built multi-tenant web platforms with React.js, Next.js, and TypeScript, used daily by 10,000+ students across universities in 3 countries, with 1,000+ concurrent sessions and sub-2-second loads via code-splitting and lazy loading.",
      "🎨 Led and built a reusable component library with Material UI and Shadcn UI, documented and tested in Storybook, eliminating duplicate UI code and speeding up feature delivery.",
      "🔄 Owned the CI/CD pipeline end-to-end: GitHub Actions workflows with automated tests and rollback-on-failure that made zero-downtime deployments the team standard.",
      "☁️ Deployed frontends on AWS (Amplify, S3, CloudFront) for fast CDN delivery, and integrated Sentry for live Error Monitoring and alerting.",
      "📱 Built an ERP platform with Auto-attendance by Face Recognition and RFID cards, delivered as a PWA with Offline Support.",
      "📊 Improved data-heavy tables with limit/offset pagination, a reusable DynamicPagination component, skeleton loaders, and eliminated race conditions.",
      "📹 Shipped real-time features including Zoom integration for live classes, Google Calendar/Meet interview scheduling, and a live Counselor leaderboard.",
      "🤖 Leverage AI-assisted development (Cursor, Claude, GPT) daily to speed up feature delivery without sacrificing architectural quality.",
    ],
  },
  {
    title: "Software Developer – Full Stack",
    job: "Ioweb3 Technologies",
    date: "April 2024 – May 2025",
    contents: [
      "💻 Worked in a Full-stack role across Web and Mobile, delivering products end-to-end with React.js, React Native, Node.js, Express, and PostgreSQL across HRMS, healthcare, cybersecurity, and e-learning.",
      "🧩 Built reusable form components (React Hook Form), paginated data tables, TanStack Query data fetching, and a multi-step routing wizard.",
      "📦 Developed a reusable support-ticketing widget, published as an npm package, and integrated it into a web app.",
      "🔒 Built RESTful APIs with JWT authentication, RBAC, input validation, rate limiting, structured error handling, and logging.",
      "🐳 Containerized services with Docker for consistent local, staging, and production environments.",
      "📱 Built cross-platform mobile apps with Offline-first storage (AsyncStorage), background sync, Firebase Push Notifications, and deep linking.",
      "⚡ Optimized database queries with strategic indexing, cutting API response times under high traffic.",
    ],
  },
];
