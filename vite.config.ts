import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
	plugins: [
		sveltekit(),
		dynamicImport() // Add the plugin here
	],
	css: {
		preprocessorOptions: {
			scss: {
				// Automatically include global.scss in all components
				additionalData: `@import './src/global.scss';`
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
