<script lang="ts">
	import { onMount } from 'svelte';
	import { createTreeView } from './treeView';

	export let data: any = {}; // Root node of the hierarchical data
	export let width: string = '800';
	export let height: string = '600';

	let chartRef;

	// Create the tree view on mount
	onMount(() => {
		createTreeView(chartRef, {
			data,
			width,
			height
		});
	});
</script>

<div bind:this={chartRef} style="width: {width}px; height: {height}px;"></div>

<style>
	.node circle {
		fill: var(--color-primary, #3498db); /* default blue color for nodes */
		transition: fill 0.3s ease;
	}
	.node:hover circle {
		fill: var(--color-accent, #e74c3c); /* default accent color on hover */
	}
	.node text {
		font-size: 12px;
		fill: var(--color-text, #333); /* default dark text color */
	}
	.link {
		fill: none;
		stroke: var(--color-border, #aaa); /* default gray color for links */
		stroke-width: 2px;
	}
</style>
