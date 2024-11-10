<script>
	import { goto } from '$app/navigation';
	import DemoCard from '$lib/components/demo/DemoCard.svelte';
	import { onMount } from 'svelte';
	export let data;
</script>

<div class="page">
	<h2>{data.groupName}</h2>
	<div class="page-body">
		{#if data.groupItems}
			{#each data.groupItems as item}
				<div class="demo-card size-{item.size}">
					<DemoCard
						title={item.name}
						path="/components/{data.groupName}/{item.name}"
						bind:component={item}
						library={data.library}
						componentName={item.name}
						groupName={data.groupName}
						props={item.showcaseProps}
					></DemoCard>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.page-body {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-large);
		margin: var(--spacing-large);
		width: var(--page-width);
		justify-content: center;
		max-width: calc((((var(--page-width)) / 3) * 3) - var(--spacing-large) * 2);
	}

	.demo-card {
		box-sizing: border-box;
		width: 100%;

		&.size-1 {
			max-width: calc(
				(((var(--page-width) - var(--spacing-large)) / 3) * 1) - var(--spacing-large) * 1
			);
		}
		&.size-2 {
			max-width: calc(
				(((var(--page-width) - var(--spacing-large)) / 3) * 2) - var(--spacing-large) * 1
			);
		}
		&.size-3 {
			max-width: calc((((var(--page-width)) / 3) * 3) - var(--spacing-large) * 2);
		}
	}
</style>
