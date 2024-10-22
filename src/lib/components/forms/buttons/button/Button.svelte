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
	$: params = { buttonId: id, buttonIndex: index };
</script>

<button
	on:click={(event) => dispatch('click', params)}
	on:mouseenter={(event) => dispatch('mouseenter', params)}
	on:mouseleave={(event) => dispatch('mouseleave', params)}
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
