const fs = require("fs")
const routes = fs.readdirSync(`./content`)
console.log(routes);

export default {
	router: {
		// Base for GH pages.
		base: '/blog/'
	},

	generate: {
		routes: routes.map(i => `/${i.split(".")[0]}`),
	},

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Blog",
		meta: [
			{ charset: "utf-8" },
			{ lang: "en" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
			{name: "theme-color", content: "#42b883"}
		],
		link: [
			{ rel: "icon", type: "image/png", href: "/blog/favicon.png" }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["./static/css/main.scss"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
	],

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
		hostname: 'https://explosion-scratch.github.io/',
	},
	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/sitemap',
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
			lang: "en"
		},
		icon: {source: './static/icon.png'},
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {
		liveEdit: false,
		markdown: {
			remarkExternalLinks: {
				target: '_blank',
				rel: 'nofollow noopener noreferrer'
			},
			prism: {
				theme: 'prism-themes/themes/prism-duotone-sea.css',
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	}
};
