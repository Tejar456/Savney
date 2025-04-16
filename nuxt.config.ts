import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    "~/assets/css/input.css",
    "notivue/notification.css",
    "notivue/animations.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["notivue/nuxt"],

  compatibilityDate: "2025-02-28",
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  app: {
    head: {
      title: "Savney",
      meta: [
        {
          name: "description",
          content:
            "Savney adalah website pengelola keuangan pribadi yang membantu Anda mengelola keuangan dengan lebih baik. Dengan fitur-fitur canggih dan antarmuka yang ramah pengguna, Savney memudahkan Anda untuk melacak pengeluaran, membuat anggaran, dan merencanakan masa depan keuangan Anda.",
        },
        {
          name: "keywords",
          content:
            "pengelola keuangan, keuangan pribadi, anggaran, pengeluaran, perencanaan keuangan",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
