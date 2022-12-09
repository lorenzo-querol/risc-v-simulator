/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				code: ["Courier Prime", "monospace"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
