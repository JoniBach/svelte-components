<script lang="ts">
	import './Dropdown.scss';
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import ButtonGroup from '$lib/components/forms/buttons/buttonGroup/ButtonGroup.svelte';
	export let label: string = '';
	export let group: any[] = [];
	export let direction: string = 'down';
	export let activeId = '';
	export let active = false;
	export let id = '';
	export let variant: string = 'column';
	export let anchor: string = 'center';
	export let size: string = 'small';

	$: isOpen = (id && activeId === id) || active;

	$: openClass = isOpen ? 'open' : 'closed';

	const handleClose = () => {
		active = false;
		activeId = '';
	};

	const handleClick = () => {
		active = !active;
		activeId === id ? (activeId = '') : (activeId = id);
	};
</script>

<div on:mouseleave={() => handleClose()} class="dropdown-wrapper">
	<Button {size} on:click={() => handleClick()}>{label}</Button>
	<div {id} class="dropdown {direction} {openClass} {variant} anchor-{anchor}">
		{#if group.length > 0}
			<ButtonGroup {size} {group} {variant} />
		{:else if 'label'}
			<Button {size} label="Close" on:click={() => handleClose()} />
		{:else}
			<slot />
		{/if}
	</div>
</div>
