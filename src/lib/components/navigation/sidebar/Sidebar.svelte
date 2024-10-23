<script lang="ts">
	import ButtonGroup from './../../forms/buttons/buttonGroup/ButtonGroup.svelte';
	import Button from './../../forms/buttons/button/Button.svelte';
	import './Sidebar.scss';
	import { fade } from 'svelte/transition';
	export let label: string = '';
	export let group: any[] = [];
	export let direction: string = 'left';
	export let activeId = ''; // Bound to parent
	export let active = false; // Bound to parent
	export let id = '';
	export let variant: string = 'over';

	$: isOpen = (id && activeId === id) || active;

	$: openClass = isOpen ? 'open' : 'closed';

	$: buttonVariant = direction === 'left' || direction === 'right' ? 'column' : 'row';

	const handleClose = () => {
		active = false;
		activeId = ''; // Updating active and activeId, which will reflect in the parent
	};
</script>

<div {id} class="sidebar {direction} {openClass} {variant}">
	<div class="sidebar-headder">
		{#if label}
			<h2 class="sidebar-label">{label}</h2>
		{/if}
		<Button label="Close" on:click={() => handleClose()} />
	</div>
	{#if group.length > 0}
		<ButtonGroup {group} variant={buttonVariant} />
	{:else}
		<slot />
	{/if}
</div>
