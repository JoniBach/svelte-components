<script lang="ts">
	import './Dropdown.scss';
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import ButtonGroup from '$lib/components/forms/buttons/buttonGroup/ButtonGroup.svelte';
	export let label: string = '';
	export let group: any[] = [];
	export let direction: string = 'left';
	export let activeId = '';
	export let active = false;
	export let id = '';
	export let variant: string = 'column';

	$: isOpen = active || activeId === id;

	$: openClass = isOpen ? 'open' : 'closed';

	const handleClose = () => {
		active = false;
		activeId = '';
	};
</script>

<div class="dropdown-wrapper">
	<Button on:click={() => (activeId === id ? (activeId = '') : (activeId = id))}>{label}</Button>
	<div {id} class="dropdown {direction} {openClass} {variant}">
		{#if group.length > 0}
			<ButtonGroup {group} {variant} />
		{:else if 'label'}
			<Button label="Close" on:click={() => handleClose()} />
		{:else}
			<slot />
		{/if}
	</div>
</div>
