<script lang="ts">
	import './Button.scss';
	import handleButton from './Button.js';
	import { createEventDispatcher } from 'svelte';
	export let label: string = '';
	export let variant: string = 'default';
	export let color: string = '';
	export let id = '';
	export let index = 0;

	const dispatch = createEventDispatcher();
</script>

<button
	on:click={(event) => dispatch('click', { buttonId: id, buttonIndex: index })}
	{id}
	class="button {variant} {color}"
	data-itemIndex={index}
>
	{#if label}
		{label}
	{:else}
		<slot />
	{/if}
</button>
