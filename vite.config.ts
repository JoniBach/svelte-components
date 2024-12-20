import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
	plugins: [
		sveltekit(),
		dynamicImport() // Add the plugin here
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
