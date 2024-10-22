<script lang="ts">
	import './Drawer.scss';
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import ButtonGroup from '$lib/components/forms/buttons/buttonGroup/ButtonGroup.svelte';
	export let label: string = '';
	export let group: any[] = [];
	export let direction: string = 'left';
	export let activeId = '';
	export let active = false;
	export let id = '';
	export let variant: string = 'over';

	$: isOpen = active || activeId === id;

	$: openClass = isOpen ? 'open' : 'closed';

	$: buttonVariant = direction === 'left' || direction === 'right' ? 'column' : 'row';

	const handleClose = () => {
		active = false;
		activeId = '';
	};
</script>

<div {id} class="drawer {direction} {openClass} {variant}">
	<div class="drawer-headder">
		{#if label}
			<h2 class="drawer-label">{label}</h2>
		{/if}
		<Button label="Close" on:click={() => handleClose()} />
	</div>
	{#if group.length > 0}
		<ButtonGroup {group} variant={buttonVariant} />
	{:else}
		<slot />
	{/if}
</div>
