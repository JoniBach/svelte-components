<script>
	import Tabs from './Tabs.svelte';
	export let active = '';
	const group = [
		{ label: 'Tab 1', id: 'tab-1' },
		{ label: 'Tab 2', id: 'tab-2' },
		{ label: 'Tab 3', id: 'tab-3' }
	];
	function handleClick(event) {
		active = event.detail.id;
	}
</script>

<Tabs {group} {active} on:click={handleClick}>
	{#if active === 'tab-1'}
		<div>Tab 1 Content</div>
	{/if}
	{#if active === 'tab-2'}
		<div>Tab 2 Content</div>
	{/if}
	{#if active === 'tab-3'}
		<div>Tab 3 Content</div>
	{/if}
</Tabs>
