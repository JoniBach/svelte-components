import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			// Remove `sass` import and ensure this section is configured correctly
		},
		// Optionally, enable sourceMap if you need debugging information for styles
		sourceMap: true
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
