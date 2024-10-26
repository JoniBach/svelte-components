<script lang="ts">
	import { onMount } from 'svelte';
	import { createLineChart } from './lineChart';

	export let data = [];
	export let title = '';
	export let xLabel = '';
	export let yLabel = '';
	export let accessor = { x: '', y: '' };
	export let width = '800';
	export let height = 400;

	let chartRef;

	const margin = { top: 40, right: 20, bottom: 70, left: 80 };

	// Adjust width if set to "100%" for responsive design
	$: chartWidth = width === '100%' ? chartRef?.clientWidth || 800 : parseInt(width);

	// Create the line chart on mount
	onMount(() => {
		createLineChart(chartRef, {
			data,
			width: chartWidth,
			height,
			margin,
			accessor,
			title,
			xLabel,
			yLabel
		});
	});
</script>

<div bind:this={chartRef} style="width: {width}; height: {height}px;"></div>
