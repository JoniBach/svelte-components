<script lang="ts">
	import Button from '$lib/components/forms/button/Button.svelte';
	import ButtonGroup from '$lib/components/forms/buttonGroup/ButtonGroup.svelte';
	import './Menu.scss';
	export let label: string = '';
	export let group: any[] = [];
	export let activeId = ''; // Bound to parent
	export let active = false; // Bound to parent
	export let id = '';
	export let variant: string = 'vertical';
	export let align: string = 'center';

	$: isOpen = (id && activeId === id) || active;

	$: openClass = isOpen ? 'open' : 'closed';

	$: buttonVariant = variant === 'horizontal' ? 'row' : 'column';

	const handleClose = () => {
		active = false;
		activeId = ''; // Updating active and activeId, which will reflect in the parent
	};
</script>

<div {id} class="menu {variant}">
	<div class="menu-headder">
		{#if label}
			<p class="menu-label align-{align}">{label}</p>
		{/if}
	</div>
	{#if group.length > 0}
		<ButtonGroup {id} {group} variant={buttonVariant} {align} on:click />
	{:else}
		<slot />
	{/if}
</div>
