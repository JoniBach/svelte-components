<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import Dropdown from './Dropdown.svelte';

	const group = [
		{ label: 'Home', href: '/' },
		{ label: 'Guide', href: '/guide' },
		{ label: 'Navigation', href: '/guide/navigation' },
		{ label: 'Dropdown', href: '/guide/navigation/dropdown' }
	];

	const props = [
		[
			{
				label: 'Drawer Column Bottom',
				group,
				variant: 'column',
				direction: 'bottom',
				id: 'pop-over-bottom'
			},
			{
				label: 'Drawer Column Right',
				group,
				variant: 'column',
				direction: 'right',
				id: 'pop-over-right'
			},
			{
				label: 'Drawer Column Left',
				group,
				variant: 'column',
				direction: 'left',
				id: 'pop-over-left'
			},
			{
				label: 'Drawer Column Top',
				group,
				variant: 'column',
				direction: 'top',
				id: 'pop-over-top'
			}
		],
		[
			{
				label: 'Drawer row Bottom',
				group,
				variant: 'row',
				direction: 'bottom',
				id: 'pop-row-bottom'
			},
			{
				label: 'Drawer row Right',
				group,
				variant: 'row',
				direction: 'right',
				id: 'pop-row-right'
			},
			{
				label: 'Drawer row Left',
				group,
				variant: 'row',
				direction: 'left',
				id: 'pop-row-left'
			},
			{
				label: 'Drawer row Top',
				group,
				variant: 'row',
				direction: 'top',
				id: 'pop-row-top'
			}
		]
	];

	let activeId = '';
</script>

{#each props as groupType}
	<div class="demo-variant">
		{#each groupType as prop, index}
			<Dropdown {...prop} {activeId} />
		{/each}
	</div>
{/each}

<div class="demo-variant">
	<Dropdown {...props[0][0]} />
	<Dropdown {...props[1][1]} />
</div>
