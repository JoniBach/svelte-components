<script lang="ts">
	import './Dropdown.scss';
	import Button from '$lib/components/forms/button/Button.svelte';
	import ButtonGroup from '$lib/components/forms/buttonGroup/ButtonGroup.svelte';
	import { createEventDispatcher } from 'svelte';
	export let label: string = '';
	export let group: any[] = [];
	export let direction: string = 'down';
	export let activeId = '';
	export let active = false;
	export let id = '';
	export let variant: string = 'column';
	export let anchor: string = 'center';
	export let size: string = 'small';
	export let href: string = '';

	const dispatch = createEventDispatcher();

	$: isOpen = (id && activeId === id) || active;

	$: openClass = isOpen ? 'open' : 'closed';

	const handleClose = () => {
		active = false;
		activeId = '';
	};

	const handleClick = (e) => {
		active = !active;
		activeId === id ? (activeId = '') : (activeId = id);
		dispatch('click', e.detail);
	};
	const handleButtonClick = (e) => {
		dispatch('click', e.detail);
	};
</script>

<div on:mouseleave={() => handleClose()} class="dropdown-wrapper">
	<Button {href} {id} {size} on:click={(e) => handleClick(e)}>{label}</Button>
	<div {id} class="dropdown {direction} {openClass} {variant} anchor-{anchor}">
		{#if group?.length > 0}
			<ButtonGroup {id} {size} {group} {variant} on:click={(e) => handleButtonClick(e)} />
		{:else if 'label'}
			<Button {id} {href} {size} label="Close" on:click={(e) => handleButtonClick(e)} />
		{:else}
			<slot />
		{/if}
	</div>
</div>
