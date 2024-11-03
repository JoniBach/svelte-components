<script lang="ts">
	import { onMount } from 'svelte';
	import { createGeoMap } from './map';
	import * as d3 from 'd3';

	export let label: string = 'Map';
	export let data: string = ''; // URL to GeoJSON data file
	export let width: number | string = 800; // Accepts both numbers and "100%"
	export let height: number = 600;

	let chartRef: HTMLElement;
	let geoData: any | null = null;

	const margin = { top: 40, right: 20, bottom: 30, left: 20 };

	onMount(async () => {
		if (!data) {
			console.error('GeoJSON data URL is missing!');
			return;
		}

		try {
			const response = await d3.json<any>(data);
			if (response && response.features) {
				geoData = response; // Assign loaded data to geoData
				createGeoMap(chartRef, {
					width: 800, // Fixed base width for viewBox
					height,
					geoData,
					colorScheme: d3.interpolateBlues,
					title: label,
					dataSource: data,
					margin
				});
			} else {
				console.error('GeoJSON data or features are missing!');
			}
		} catch (error) {
			console.error('Error loading GeoJSON data:', error);
		}
	});
</script>

<div bind:this={chartRef} aria-label={label} role="img" style="width: {width}; height: auto;"></div>
