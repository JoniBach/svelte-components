<script lang="ts">
	import DemoPropTable from './DemoPropTable.svelte';
	import DemoLiveRender from './DemoLiveRender.svelte';
	import DemoCodeSnippet from './DemoCodeSnippet.svelte';
	export let component: { props: any[]; name: string } = { props: [], name: '' };
	export let componentName: string = '';
	export let groupName: string = '';
	export let componentsDirectory: string = '../';
	export let library: string = '';
	export let props = {};
</script>

<!-- DemoComponent -->
<div class="component-body">
	{#if component && component.name}
		{#if component?.props}
			<!-- DemoLiveRender  -->
			<DemoLiveRender {props} {component} {componentName} {groupName} {componentsDirectory} />
		{/if}
		<!-- DemoCodeSnippet -->
		<DemoCodeSnippet {component} {props} {library} />
		<!-- DemoPropTable -->
		<DemoPropTable bind:component />
	{:else}
		<p>Component loading.</p>
	{/if}
</div>

<style>
	.component-body {
		margin: var(--spacing-large);
		flex-grow: 1;
		overflow: auto;
	}
</style>
