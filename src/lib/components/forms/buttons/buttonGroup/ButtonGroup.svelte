<script lang="ts">
	import './ButtonGroup.scss';
	import handleButtongroup from './ButtonGroup.js';
	import Button from '../button/Button.svelte';

	export let label: string = '';
	export let id: string = '';
	export let group: any[] = [];
	export let variant: string = 'default';
	export let gap: string = 'small';
	import { createEventDispatcher } from 'svelte';
	export let index = 0;

	const dispatch = createEventDispatcher();
</script>

<div class="button-group {variant} gap-{gap}">
	{#each group as prop, buttonIndex}
		<Button
			{...prop}
			on:click={(event) =>
				dispatch('click', {
					buttonId: event.detail.id,
					buttonGroupId: id,
					buttonIndex: event.detail.buttonIndex,
					buttonGroupIndex: index
				})}
			index={buttonIndex}
		/>
	{/each}
</div>
