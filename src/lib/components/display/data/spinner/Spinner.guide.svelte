<script lang="ts">
	import Spinner from './Spinner.svelte';

	const props = [
		[
			{
				size: 'xl',
				color: 'accent',
				borderWidth: 'tiny'
			},
			{
				size: 'large',
				color: 'primary',
				borderWidth: 'tiny'
			},
			{
				size: 'medium',
				color: 'secondary',
				borderWidth: 'tiny'
			},
			{
				size: 'small',
				color: 'tertiary',
				borderWidth: 'tiny'
			}
		],
		[
			{
				size: 'xl',
				color: 'accent',
				borderWidth: 'small'
			},
			{
				size: 'large',
				color: 'primary',
				borderWidth: 'small'
			},
			{
				size: 'medium',
				color: 'secondary',
				borderWidth: 'small'
			}
		],
		[
			{
				size: 'xl',
				color: 'accent',
				borderWidth: 'medium'
			}
		]
	];
</script>

{#each props as prop}
	<div class="demo-variant flex">
		{#each prop as { size, color, borderWidth }}
			<Spinner {size} {color} {borderWidth} />
		{/each}
	</div>
{/each}
