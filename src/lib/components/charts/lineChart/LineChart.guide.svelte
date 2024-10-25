<script lang="ts">
	import LineChart from './LineChart.svelte';

	const data = [
		{
			product: 'Product A',
			sales: [
				{ month: 'January', amount: 10000 },
				{ month: 'February', amount: 12000 },
				{ month: 'March', amount: 14000 },
				{ month: 'April', amount: 13000 },
				{ month: 'May', amount: 15000 }
			]
		},
		{
			product: 'Product B',
			sales: [
				{ month: 'January', amount: 15000 },
				{ month: 'February', amount: 17000 },
				{ month: 'March', amount: 16000 },
				{ month: 'April', amount: 18000 },
				{ month: 'May', amount: 17500 }
			]
		},
		{
			product: 'Product C',
			sales: [
				{ month: 'January', amount: 9000 },
				{ month: 'February', amount: 9500 },
				{ month: 'March', amount: 10000 },
				{ month: 'April', amount: 11000 },
				{ month: 'May', amount: 10500 }
			]
		},
		{
			product: 'Product D',
			sales: [
				{ month: 'January', amount: 17000 },
				{ month: 'February', amount: 16500 },
				{ month: 'March', amount: 17500 },
				{ month: 'April', amount: 18000 },
				{ month: 'May', amount: 18500 }
			]
		},
		{
			product: 'Product E',
			sales: [
				{ month: 'January', amount: 13000 },
				{ month: 'February', amount: 13500 },
				{ month: 'March', amount: 14000 },
				{ month: 'April', amount: 14500 },
				{ month: 'May', amount: 15000 }
			]
		}
	];

	const props = {
		title: 'Monthly Sales Review by Product',
		xLabel: 'Month',
		yLabel: 'Sales (in USD)',
		accessor: {
			x: 'month',
			y: 'amount',
			series: 'product'
		},
		width: 800,
		height: 400,
		data: data.flatMap((d) => d.sales.map((sale) => ({ ...sale, product: d.product })))
	};
</script>

<LineChart {...props} />
