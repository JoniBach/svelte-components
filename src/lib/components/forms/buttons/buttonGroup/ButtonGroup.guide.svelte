<script lang="ts">
	import ButtonGroup from './ButtonGroup.svelte';

	const group = [
		{ id: 'default', label: 'Default' },
		{ id: 'Solid', label: 'Solid', variant: 'solid' },
		{ id: 'Outlined', label: 'Outlined', variant: 'outlined' }
	];

	const props = [
		{ id: 'default', variant: 'default', group },
		{ id: 'small-gap', variant: 'default', gap: 'small', group },
		{ id: 'medium-gap', variant: 'default', gap: 'medium', group },
		{ id: 'large-gap', variant: 'default', gap: 'large', group },
		{ id: 'row', variant: 'row', group },
		{ id: 'row-reverse', variant: 'row-reverse', group },
		{ id: 'column', variant: 'column', group },
		{ id: 'column-reverse', variant: 'column-reverse', group },
		{ id: 'center', variant: 'center', group },
		{ id: 'right', variant: 'right', group },
		{ id: 'left', variant: 'left', group },
		{ id: 'space-between', variant: 'space-between', group },
		{ id: 'space-around', variant: 'space-around', group },
		{ id: 'space-evenly', variant: 'space-evenly', group },
		{ id: 'wrap', variant: 'wrap', group }
	];

	const handleClick = (event: CustomEvent) => {
		alert(JSON.stringify(event.detail) + ' clicked');
	};
</script>

<div class="demo-container">
	{#each props as prop, index}
		<div class="demo-variant">
			<ButtonGroup {...prop} on:click={(event) => handleClick(event)} {index} />
		</div>
	{/each}
</div>
