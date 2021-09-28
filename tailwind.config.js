const colors = require("tailwindcss/colors");
const hljs = require('highlight.js');
module.exports = {
	darkMode: "class",
	mode: "jit",
	theme: {
		darkSelector: ".dark",
		extend: {
		  colors: {
				"light-blue": colors.lightBlue,
				cyan: colors.cyan,
		  },
		  typography: (theme) => ({
				light: {
			  css: [
						{
				  color: theme("colors.gray.400"),
				  "[class~=\"lead\"]": {
								color: theme("colors.gray.300"),
				  },
				  a: {
								color: theme("colors.white"),
				  },
				  strong: {
								color: theme("colors.white"),
				  },
				  "ol > li::before": {
								color: theme("colors.gray.400"),
				  },
				  "ul > li::before": {
								backgroundColor: theme("colors.gray.600"),
				  },
				  hr: {
								borderColor: theme("colors.gray.200"),
				  },
				  blockquote: {
								color: theme("colors.gray.200"),
								borderLeftColor: theme("colors.gray.600"),
				  },
				  h1: {
								color: theme("colors.white"),
				  },
				  h2: {
								color: theme("colors.white"),
				  },
				  h3: {
								color: theme("colors.white"),
				  },
				  h4: {
								color: theme("colors.white"),
				  },
				  "figure figcaption": {
								color: theme("colors.gray.400"),
				  },
				  code: {
								color: theme("colors.white"),
				  },
				  "a code": {
								color: theme("colors.white"),
				  },
				  pre: {
								color: theme("colors.gray.200"),
								backgroundColor: theme("colors.gray.800"),
				  },
				  thead: {
								color: theme("colors.white"),
								borderBottomColor: theme("colors.gray.400"),
				  },
				  "tbody tr": {
								borderBottomColor: theme("colors.gray.600"),
				  },
						},
			  ],
				},
		  }),
		},
	  },
	  variants: {
		extend: {
		  typography: ["dark"],
		},
		backgroundColor: ["dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd", "hover", "responsive"],
		borderColor: ["dark", "dark-focus", "dark-focus-within", "hover", "responsive"],
		textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"]
	  },
	plugins: [
		require("tailwindcss-dark-mode")(),
		require("@tailwindcss/typography")
	]
};