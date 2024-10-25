<script lang="ts">
	import Barchart from './BarChart.svelte';

	const data = [
		{
			product: 'Product A',
			sales: 12000
		},
		{
			product: 'Product B',
			sales: 15000
		},
		{
			product: 'Product C',
			sales: 9000
		},
		{
			product: 'Product D',
			sales: 17000
		},
		{
			product: 'Product E',
			sales: 13000
		}
	];

	const props = [
		{
			title: 'Product sales review',
			xLabel: 'Product',
			yLabel: 'Sales (in USD)',
			accessor: {
				x: 'product',
				y: 'sales'
			},
			width: 800,
			height: 400,
			data
		}
	];
</script>

{#each props as prop}
	<Barchart {...prop} />
{/each}
