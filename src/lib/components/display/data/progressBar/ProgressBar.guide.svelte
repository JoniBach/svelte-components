<script lang="ts">
	import Progressbar from './ProgressBar.svelte';

	// Function to generate a random percentage value between 0 and 1100
	function getRandomPercentage() {
		return Math.floor(Math.random() * 101); // 0 to 1100
	}

	// Function to generate a random total value between 0 and 10
	function getRandomTotal() {
		return Math.floor(Math.random() * 11); // 0 to 10
	}

	// Function to generate a random count based on the total
	function getRandomCount(total) {
		return Math.floor(Math.random() * (total + 1)); // 0 to total
	}

	// Generate props with random values
	const totalValue = getRandomTotal(); // Generate random total value first

	const props = [
		[
			{
				label: 'Inset',
				variant: 'inset',
				type: 'percentage',
				value: getRandomPercentage() // Generate random percentage
			},
			{
				label: 'Separated',
				variant: 'separated',
				type: 'percentage',
				value: getRandomPercentage() // Generate random percentage
			}
		],
		[
			{
				label: 'Percentage',
				type: 'percentage',
				value: getRandomPercentage() // Generate random percentage
			},
			{
				label: 'Count',
				type: 'count',
				value: getRandomCount(totalValue), // Generate random count based on total
				total: totalValue // Set total
			}
		]
	];
</script>

<div class="demo-container">
	{#each props as group}
		<div class="demo-variant">
			{#each group as prop}
				<Progressbar {...prop} />
			{/each}
		</div>
	{/each}
</div>
