<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import Sidebar from './Sidebar.svelte';

	const group = [
		{ label: 'Home', href: '/' },
		{ label: 'Guide', href: '/guide' },
		{ label: 'Navigation', href: '/navigation' },
		{ label: 'Sidebar', href: '/sidebar' }
	];

	const props = [
		[
			{
				label: 'Pop Over Right',
				group,
				variant: 'over',
				direction: 'right',
				id: 'pop-over-right'
			},
			{
				label: 'Pop Over Left',
				group,
				variant: 'over',
				direction: 'left',
				id: 'pop-over-left'
			},
			{
				label: 'Pop Over Top',
				group,
				variant: 'over',
				direction: 'top',
				id: 'pop-over-top'
			},
			{
				label: 'Pop Over Bottom',
				group,
				variant: 'over',
				direction: 'bottom',
				id: 'pop-over-bottom'
			}
		]
		// [
		// 	{
		// 		label: 'Push Open Right',
		// 		group,
		// 		variant: 'push',
		// 		direction: 'right',
		// 		id: 'push-open-right'
		// 	},
		// 	{
		// 		label: 'Push Open Left',
		// 		group,
		// 		variant: 'push',
		// 		direction: 'left',
		// 		id: 'push-open-left'
		// 	},
		// 	{
		// 		label: 'Push Open Top',
		// 		group,
		// 		variant: 'push',
		// 		direction: 'top',
		// 		id: 'push-open-top'
		// 	},
		// 	{
		// 		label: 'Push Open Bottom',
		// 		group,
		// 		variant: 'push',
		// 		direction: 'bottom',
		// 		id: 'push-open-bottom'
		// 	}
		// ]
	];

	let activeId = '';
</script>

{#each props as groupType}
	<div class="demo-variant">
		{#each groupType as prop, index}
			<Button on:click={() => (activeId === prop.id ? (activeId = '') : (activeId = prop.id))}
				>{prop.label}</Button
			>
			<Sidebar {...prop} {activeId} />
		{/each}
	</div>
{/each}
