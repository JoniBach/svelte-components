<script lang="ts">
	import { onMount } from 'svelte';
	import { createPieChart } from './pieChart';

	export let data: any[] = [];
	export let title: string = '';
	export let accessor: { value: string; label: string } = { value: '', label: '' };
	export let width: string = '400';
	export let height: string = '400';

	let chartRef;

	const margin = { top: 40, right: 40, bottom: 40, left: 40 };

	// Create the pie chart on mount
	onMount(() => {
		createPieChart(chartRef, {
			data,
			width,
			height,
			margin,
			accessor,
			title
		});
	});
</script>

<div bind:this={chartRef} style="width: {width}px; height: {height}px;"></div>
