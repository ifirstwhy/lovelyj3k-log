const CONFIG = {
  // profile setting (required) 
  profile: {
    name: "보름(손현경)",
    image: "/shkisme.png", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Backend Developer",
    bio: "I develop everything you need ✨",
    email: "shkisme0130@gmail.com",
    linkedin: "",
    github: "shkisme",
    instagram: "shkisme",
    log: "https://heathered-dress-bc9.notion.site/9492547c587240e4b3eb460be6f3cdab?v=ea19e20b9e154318ae21d4e40bd2109c&pvs=4",
  },
  projects: [
    {
      name: `Keeper Homepage Renewal`,
      href: "https://github.com/KEEPER31337/Homepage-Back-R2",
    },
  ],
  // blog setting (required)
  blog: {
    title: "shkisme-log",
    description: "welcome to shkisme-log!",
  },

  // CONFIG configration (required)
  link: "https://shkisme.vercel.app",
  since: 2023, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "shkisme/morethan-log",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
