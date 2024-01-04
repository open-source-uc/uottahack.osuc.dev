/** @type {import('tailwindcss').Config} */
export default {
	plugins: [require('@tailwindcss/forms')],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	}
};
