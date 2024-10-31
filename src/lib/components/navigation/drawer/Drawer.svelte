<script lang="ts">
	import { slide } from 'svelte/transition';
	import './Drawer.scss';
	import handleDrawer from './Drawer.js';
	import Button from '$lib/components/forms/buttons/button/Button.svelte';

	export let label: string = '';
	export let active = false;

	$: buttonLabel = active ? 'Close' : label;

	function fadeSlide(node, options) {
		const slideTrans = slide(node, options);
		return {
			duration: options.duration,
			css: (t) => `${slideTrans.css(t)} opacity: ${t};`
		};
	}
</script>

{#if label}
	<Button on:click={() => (active = !active)}>{buttonLabel}</Button>
{/if}

{#if active}
	<div class="drawer {active ? 'open' : 'closed'}" transition:slide={{ duration: 100 }}>
		<h2>{label}</h2>
		<slot />
	</div>
{/if}
