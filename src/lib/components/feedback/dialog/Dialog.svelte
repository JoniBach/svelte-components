<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import './dialog.scss';
	import ButtonGroup from '$lib/components/forms/buttonGroup/ButtonGroup.svelte';

	export let label: string = 'Confirmation';
	export let description: string = 'Are you sure?';
	export let id: string = 'confirm-dialog';
	export let active: boolean = false;
	export let position: string = 'top';
	export let group: string[] = [{ id: 'clear', label: 'Ok', variant: 'outlined', size: 'small' }];
	export let color = 'panel';
	const dispatch = createEventDispatcher();

	const handleClick = (event: CustomEvent) => dispatch(event.detail.buttonId, event.detail);
</script>

<div class="confirm-dialog dialog-{position} {active ? 'active' : ''} color-{color}">
	<p class="dialog-title">{label}</p>
	<div class="dialog-actions">
		<ButtonGroup {id} {group} on:click={(event) => handleClick(event)} />
	</div>
</div>
