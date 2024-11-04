<script lang="ts">
	import Button from '$lib/components/forms/button/Button.svelte';
	import Menu from './Menu.svelte';

	const group = [
		{ label: 'Home', id: 'home' },
		{ label: 'Guide', id: 'guide' },
		{ label: 'Navigation', id: 'navigation' },
		{ label: 'Menu', id: 'menu' }
	];

	const props = [
		{
			label: 'Vertical Menu',
			group,
			variant: 'vertical',
			id: 'pop-over-right',
			align: 'left'
		},
		{
			label: 'Horizontal Menu',
			group,
			variant: 'horizontal',
			id: 'pop-over-left'
		}
	];

	function handleClick(event) {
		console.log(event.detail);
	}
</script>

{#each props as prop, index}
	<div class="demo-variant">
		<!-- <Button on:click={() => (activeId === prop.id ? (activeId = '') : (activeId = prop.id))}
				>{prop.label}</Button
			> -->
		<Menu {...prop} on:click={handleClick} />
	</div>
{/each}
