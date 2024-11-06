<script lang="ts">
	import './button.scss';
	import { createEventDispatcher } from 'svelte';
	export let label: string = '';
	export let variant: string = 'default';
	export let color: string = '';
	export let id = '';
	export let slot;
	export let index = 0;
	export let size: string = 'small';
	export let align: 'left' | 'center' | 'right' = 'center';
	export let href: string = '';

	const dispatch = createEventDispatcher();
	const handleClick = (event, type) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(type, { buttonId: id, buttonIndex: index, href });
	};
</script>

<button
	{...slot ? { slot } : {}}
	on:click={(event) => handleClick(event, 'click')}
	on:mouseenter={(event) => handleClick(event, 'mouseenter')}
	on:mouseleave={(event) => handleClick(event, 'mouseleave')}
	{id}
	class="button {variant} {color} size-{size} align-{align}"
	data-itemIndex={index}
>
	{#if label}
		{label}
	{:else}
		<slot />
	{/if}
</button>
