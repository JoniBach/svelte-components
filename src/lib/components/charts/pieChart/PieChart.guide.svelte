<script lang="ts">
	import PieChart from './PieChart.svelte';

	const props = {
		label: '!!!'
	};
</script>

<PieChart
	data={[
		{ label: 'Product A', value: 30 },
		{ label: 'Product B', value: 20 },
		{ label: 'Product C', value: 50 }
	]}
	title="Sales Distribution"
	accessor={{ label: 'label', value: 'value' }}
	width={400}
	height={400}
/>
