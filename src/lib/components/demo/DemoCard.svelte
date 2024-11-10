<script lang="ts">
	import DemoCodeSnippet from './DemoCodeSnippet.svelte';
	import DemoLiveRender from './DemoLiveRender.svelte';
	import DemoPropTable from './DemoPropTable.svelte';

	export let title = 'Demo Card';
	export let path = '';
	export let showTableIcon = true;
	export let showCodeIcon = true;

	export let component: { props: any[]; name: string } = { props: [], name: '' };
	export let componentName: string = '';
	export let groupName: string = '';
	export let componentsDirectory: string = '../';
	export let library: string = '';
	export let props = {};

	let activeFeature = 'live';

	// Functions to handle icon clicks
	function showTable() {
		activeFeature = 'props';
	}

	function showCode() {
		activeFeature = 'code';
	}

	function showLive() {
		activeFeature = 'live';
	}

	// $: console.log({
	// 	component,
	// 	props,
	// 	library,
	// 	componentName,
	// 	groupName,
	// 	componentsDirectory,
	// 	title,
	// 	path
	// });
</script>

<div class="demo-card-container">
	<div class="demo-card-header">
		<p class="demo-card-title">{title} - {activeFeature}</p>
		<div class="demo-card-actions">
			<!-- Play button for initiating live view -->
			<div class="icon-link" aria-label="Live view" on:click={showLive}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="var(--color-text)"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 3v18l15-9-15-9z" />
				</svg>
			</div>

			{#if showTableIcon}
				<div class="icon-link" aria-label="Table view" on:click={showTable}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="var(--color-text)"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 4v4h4V7H4zm6 0v4h4V7h-4zm6 0v4h4V7h-4zM4 13v4h4v-4H4zm6 0v4h4v-4h-4zm6 0v4h4v-4h-4z"
						/>
					</svg>
				</div>
			{/if}

			{#if showCodeIcon}
				<div class="icon-link" aria-label="Code view" on:click={showCode}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="var(--color-text)"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M15 3.75l-4.5 16.5"
						/>
					</svg>
				</div>
			{/if}

			{#if path}
				<a href={path} class="icon-link" aria-label="Open external link">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon"
						fill="var(--color-text)"
						viewBox="0 0 24 24"
					>
						<path
							d="M14 3h6a1 1 0 0 1 1 1v6h-2V5.414L10.414 14 9 12.586 17.586 4H14V3zM5 6h6v2H5v11h11v-6h2v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 1 1z"
						/>
					</svg>
				</a>
			{/if}
		</div>
	</div>
	<div class="demo-card-body">
		{#if component && component.name}
			{#if activeFeature === 'live'}
				{#if component?.props}
					<!-- DemoLiveRender  -->
					<DemoLiveRender {props} {component} {componentName} {groupName} {componentsDirectory} />
				{/if}
			{/if}
			<!-- DemoCodeSnippet -->
			{#if activeFeature === 'code'}
				<DemoCodeSnippet {component} {props} {library} />
			{/if}
			<!-- DemoPropTable -->
			{#if activeFeature === 'props'}
				<DemoPropTable bind:component />
			{/if}
		{:else}
			<p>Component loading.</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.demo-card-container {
		border-radius: var(--spacing-small);
		box-shadow: var(--shadow-medium);
		border: 1px solid var(--color-border);
		overflow: hidden;
		height: 100%;
	}

	.demo-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-panel);
		padding: var(--spacing-small);

		.demo-card-actions {
			display: flex;
			align-items: center;
		}

		.demo-card-title {
			font-size: var(--typography-small);
			margin: 0;
			color: var(--color-text);
		}

		.icon-link {
			display: inline-flex;
			align-items: center;
			margin-left: var(--spacing-small);
			cursor: pointer;
		}

		.icon {
			width: 1em;
			height: 1em;
		}
	}

	.demo-card-body {
		padding: var(--spacing-xl);
		font-size: var(--typography-small);
		box-shadow: inset var(--shadow-medium);
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		align-content: center;
		justify-items: center;
	}
</style>
