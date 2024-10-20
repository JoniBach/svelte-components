<!-- File: src/routes/guide/[component].svelte -->
<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	$: component = $page.params.component;

	let DynamicComponent;
	$: dynamicUrl = `../../../lib/components/${component}.guide.svelte`;

	onMount(() => {});

	$: import(dynamicUrl).then((res) => {
		if (res.default) {
			DynamicComponent = res.default;
		}
	});
</script>

{#if DynamicComponent}
	<svelte:component this={DynamicComponent} />
{:else}
	<p>Not found</p>
{/if}
