<script lang="ts">
	import './Button.scss';
	import handleButton from './Button.js';
	import { createEventDispatcher } from 'svelte';
	export let label: string = '';
	export let variant: string = 'default';
	export let color: string = '';
	export let id = '';
	export let slot;
	export let index = 0;
	export let size: string = 'small';

	const dispatch = createEventDispatcher();
	const handleClick = (event, type) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(type, { buttonId: id, buttonIndex: index });
	};
</script>

<button
	{...slot ? { slot } : {}}
	on:click={(event) => handleClick(event, 'click')}
	on:mouseenter={(event) => handleClick(event, 'mouseenter')}
	on:mouseleave={(event) => handleClick(event, 'mouseleave')}
	{id}
	class="button {variant} {color} size-{size}"
	data-itemIndex={index}
>
	{#if label}
		{label}
	{:else}
		<slot />
	{/if}
</button>
