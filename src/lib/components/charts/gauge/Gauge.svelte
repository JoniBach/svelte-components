<script lang="ts">
	import { onMount } from 'svelte';
	import { createGauge } from './gauge';

	export let value: number = 75;
	export let minValue: number = 0;
	export let maxValue: number = 100;
	export let size: number | string = 200; // can be a number (pixels) or '100%'
	export let innerColor: string = 'accent';
	export let outerColor: string = 'neutral';
	export let textColor: string = 'text';
	export let label: string = 'Gauge';

	let svgContainer: HTMLElement;

	onMount(() => {
		createGauge(svgContainer, {
			value,
			minValue,
			maxValue,
			size,
			innerColor,
			outerColor,
			textColor,
			label
		});
	});
</script>

<!-- Container styling to handle both pixel and '100%' size values -->
<div
	bind:this={svgContainer}
	style="width: {typeof size === 'string' ? size : size + 'px'}; height: {typeof size === 'string'
		? 'auto'
		: size + 'px'};"
></div>
