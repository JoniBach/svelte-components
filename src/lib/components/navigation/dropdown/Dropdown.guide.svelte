<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import Dropdown from './Dropdown.svelte';

	const group = [
		{ label: 'Home', href: '/' },
		{ label: 'Guide', href: '/guide' },
		{ label: 'Navigation', href: '/guide/navigation' },
		{ label: 'Dropdown', href: '/guide/navigation/dropdown' },
		{ label: 'Supercalifragilistic', href: '/super/cali/fragi/listic' }
	];

	const props = [
		[
			{
				label: 'Drawer Column Down',
				group,
				variant: 'column',
				direction: 'down',
				id: 'pop-over-down'
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
				label: 'Drawer Column Up',
				group,
				variant: 'column',
				direction: 'up',
				id: 'pop-over-up'
			}
		],
		[
			{
				label: 'Drawer row Down',
				group,
				variant: 'row',
				direction: 'down',
				id: 'pop-row-down'
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
				label: 'Drawer row Up',
				group,
				variant: 'row',
				direction: 'up',
				id: 'pop-row-up'
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

<div class="demo-variant">
	<Dropdown {group} label="Anchor left" anchor="left" />
	<Dropdown {group} label="Anchor Center" anchor="center" />
	<Dropdown {group} label="Anchor Right" anchor="right" />
</div>
