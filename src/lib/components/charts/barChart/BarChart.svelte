<script lang="ts">
	import { onMount } from 'svelte';
	import { createBarChart } from './barChart';

	export let data: any[] = [];
	export let title: string = '';
	export let xLabel: string = '';
	export let yLabel: stringl = '';
	export let accessor: { x: string; y: string } = { x: '', y: '' };
	export let width = '800';
	export let height = '400';

	let chartRef;

	const margin = { top: 40, right: 20, bottom: 70, left: 80 };

	$: chartWidth = width === '100%' ? chartRef?.clientWidth || 800 : parseInt(width);

	onMount(() => {
		createBarChart(chartRef, {
			data,
			width: chartWidth,
			height: height,
			margin,
			accessor,
			title,
			xLabel,
			yLabel
		});
	});
</script>

<div bind:this={chartRef} style="width: {width}; height: {height}px;"></div>
