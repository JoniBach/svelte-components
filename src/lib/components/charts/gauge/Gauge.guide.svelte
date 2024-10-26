<script lang="ts">
	import Gauge from './Gauge.svelte';

	const props = [
		{
			value: 75,
			minValue: 0,
			maxValue: 100,
			size: '100%',
			innerColor: 'primary',
			outerColor: 'neutral',
			label: 'Battery'
		},
		{
			value: 40,
			minValue: 0,
			maxValue: 100,
			size: 150,
			innerColor: 'accent',
			outerColor: 'neutral',
			label: 'Fuel'
		}
	];
</script>

{#each props as prop}
	<div class="demo-variant">
		<Gauge {...prop} />
	</div>
{/each}
