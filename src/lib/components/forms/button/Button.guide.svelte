<script lang="ts">
	import Button from './Button.svelte';

	const props = [
		{ id: 'default', label: 'Default' },
		{ id: 'primary', label: 'Primary', color: 'primary' },
		{ id: 'secondary', label: 'Secondary', color: 'secondary' },

		{ id: 'solid', label: 'Solid', variant: 'solid' },
		{ id: 'primary-solid', label: 'Primary Solid', variant: 'solid', color: 'primary' },
		{ id: 'secondary-solid', label: 'Secondary Solid', variant: 'solid', color: 'secondary' },

		{ id: 'outlined', label: 'Outlined', variant: 'outlined' },
		{ id: 'primary-outlined', label: 'Primary Outlined', variant: 'outlined', color: 'primary' },
		{
			id: 'secondary-outlined',
			label: 'Secondary Outlined',
			variant: 'outlined',
			color: 'secondary'
		}
	];

	const handleClick = (event: CustomEvent) => {
		alert(JSON.stringify(event.detail) + ' clicked');
	};
</script>

<div class="demo-container">
	{#each props as prop, index}
		<Button {...prop} on:click={(event) => handleClick(event)} {index} />
	{/each}
</div>
