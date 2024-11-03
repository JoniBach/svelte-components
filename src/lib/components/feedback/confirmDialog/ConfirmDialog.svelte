<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import './ConfirmDialog.scss';
	import ButtonGroup from '$lib/components/forms/buttons/buttonGroup/ButtonGroup.svelte';

	export let label: string = 'Confirmation';
	export let description: string = 'Are you sure?';
	export let id: string = 'confirm-dialog';
	export let active: boolean = false;
	export let position: string = 'top';
	export let group: string[] = [
		{ id: 'cancel', label: 'Cancel', variant: 'outlined', color: 'danger' },
		{ id: 'confirm', label: 'Confirm', variant: 'solid', color: 'success' }
	];
	const dispatch = createEventDispatcher();

	const handleClick = (event: CustomEvent) => dispatch(event.detail.buttonId, event.detail);
</script>

<div class="confirm-dialog dialog-{position} {active ? 'active' : ''}">
	<div class="dialog-content">
		<p class="dialog-title">{label}</p>
		<p class="dialog-description">{description}</p>
		<div class="dialog-actions">
			<ButtonGroup {id} {group} on:click={(event) => handleClick(event)} />
		</div>
	</div>
</div>
