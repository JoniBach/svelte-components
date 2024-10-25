<script lang="ts">
	import Heatmap from './Heatmap.svelte';

	const props = {
		label: '!!!'
	};
</script>

<Heatmap
	data={[
		{ x: 'A', y: '1', value: 10 },
		{ x: 'A', y: '2', value: 20 },
		{ x: 'B', y: '1', value: 30 },
		{ x: 'B', y: '2', value: 40 }
	]}
	xLabel="X Axis Label"
	yLabel="Y Axis Label"
	width={800}
	height={600}
/>
