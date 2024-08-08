const CONFIG = {
  // 프로필 설정
  profile: {
    name: "J3K",
    image: "/avatar.png", // 아바타 이미지 경로
    role: "< vvorlcl />",
    bio: "",
    email: "",
    linkedin: "",
    github: "ifirstwhy",
    instagram: "lovelyj3k",
  },

  // 프로젝트 설정
  projects: [
    {
      name: `lovelyj3k`,
      href: "https://ifirstwhy.github.io",
    },
  ],

  // 블로그 설정
  blog: {
    title: "to. lovelyj3k ✨",
    description: "welcome to lovelyj3k!",
    scheme: "dark", // 테마 설정 ('light' | 'dark' | 'system')
    followSystemTheme: false, // 시스템 테마에 따라 블로그 테마를 자동으로 변경
  },

  // CONFIG 설정
  link: "https://lovelyj3k.vercel.app/",
  since: 2024, // 사용 연도
  lang: "ko-KR", // 언어 설정 (예: 'en-US', 'zh-CN', 'ko-KR')
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // OG 이미지 생성 URL

  // Notion 설정
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // 플러그인 설정
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

  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },

  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "ifirstwhy/lovelyj3k-log",
      "issue-term": "og:title",
    },
  },

  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id 값
    },
  },

  isProd: process.env.VERCEL_ENV === "production", // 환경 구분 (개발/생산)
  revalidateTime: 1, // revalidate time for [slug], index
}

module.exports = { CONFIG }
