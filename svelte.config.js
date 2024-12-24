import { sveltePreprocess } from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

// import adapter from '@sveltejs/adapter-auto';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			// Remove `sass` import and ensure this section is configured correctly
			api: 'modern-compiler',
			includePaths: ['src']
		},
		// Optionally, enable sourceMap if you need debugging information for styles
		sourceMap: true
	}),

	kit: {
		adapter: vercel()
		// adapter: adapter()
	}
};

export default config;
