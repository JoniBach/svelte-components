<script lang="ts">
	import DemoComponent from '$lib/components/demo/DemoComponent.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	$: components = data.components;
	// $: componentName, groupName, component, (props = {});
	$: loading = true;

	$: componentName = data.componentName;
	$: groupName = data.groupName;
	$: component = data.component;

	$: props = data.props;
	$: library = data.library;

	onMount(async () => {
		try {
			loading = false;
		} catch (error) {
			console.error('Error fetching components:', error);
			loading = false;
		}
	});
	$: console.log('data', data);
</script>

{#if !loading}
	{#if component}
		<DemoComponent bind:component {library} {componentName} {groupName} {props} />
	{:else}
		<p>Component not found.</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}
