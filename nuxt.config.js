const fs = require("fs");
var routes = fs.readdirSync(`./content`);
const generate_meta = require("./meta.js");

routes = routes.map((i) => `/${i.split(".")[0]}`);

console.log(routes);

const meta = {
  description: "Your daily chunk of code content",
  color: "#42b883",
  url: "https://explosion-scratch.github.io/blog",
  title: "bytesite",
  image: "https://explosion-scratch.github.io/blog/full_logo.png",
};
export default {
  // ssr: false,
  router: {
    // Base for GH pages.
    base: "/blog/",
  },

  generate: {
    routes,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "bytesite",
    meta: [
      { charset: "utf-8" },
      { lang: "en" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      ...generate_meta(meta),
    ],
    link: [
      { rel: "author", href: "https://github.com/explosion-scratch" },
      {
        rel: "search",
        href: "https://explosion-scratch.github.io/blog/search",
      },
      {
        type: "application/json+oembed",
        href: "https://explosion-scratch.github.io/blog/oembed.json",
      },
      { rel: "icon", type: "image/png", href: "/blog/favicon.png" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["./static/css/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // Tailwind dark mode variants
    "@nuxtjs/color-mode",
  ],
  sitemap: {
    hostname: "https://explosion-scratch.github.io/",
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/sitemap",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
    icon: { source: "./static/icon.png" },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
    markdown: {
      remarkExternalLinks: {
        target: "_blank",
        rel: "nofollow noopener noreferrer",
      },
      prism: {
        theme: "prism-themes/themes/prism-duotone-sea.css",
      },
    },
  },
};
