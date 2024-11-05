<script lang="ts">
	import { onMount } from 'svelte';
	import { createHeatmap } from './heatmap.js';
	import * as d3 from 'd3';

	export let data: any[] = []; // Data should be an array of objects with x, y, and value fields
	export let xLabel: string = '';
	export let yLabel: string = '';
	export let width: number = '800';
	export let height: number = '600';

	let chartRef;

	const colorScheme = d3.interpolateBlues; // Default color scheme

	// Create the heatmap on mount
	onMount(() => {
		createHeatmap(chartRef, {
			data,
			width,
			height,
			colorScheme,
			xLabel,
			yLabel
		});
	});
</script>

<div bind:this={chartRef} style="width: {width}px; height: {height}px;"></div>
