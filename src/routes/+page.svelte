<script lang="ts">
	import Demo from './Demo.svelte';
	import './page.scss';
	import '../global.scss';
	import { initTheme } from '$lib';
	// On mount, set the theme from localStorage if available
	initTheme();
</script>

<Demo />
