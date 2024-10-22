<script lang="ts">
	import ButtonGroup from './../../forms/buttons/buttonGroup/ButtonGroup.svelte';
	import Button from './../../forms/buttons/button/Button.svelte';
	import './Sidebar.scss';
	export let label: string = '';
	export let group: any[] = [];
	export let direction: string = 'left';
	export let activeId = '';
	export let active = false;
	export let id = '';
	export let variant: string = 'over';

	$: isOpen = (id && activeId === id) || active;

	$: openClass = isOpen ? 'open' : 'closed';

	$: buttonVariant = direction === 'left' || direction === 'right' ? 'column' : 'row';

	const handleClose = () => {
		active = false;
		activeId = '';
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
