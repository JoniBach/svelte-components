<script>
	import Menu from './../lib/components/navigation/menu/Menu.svelte';
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';
	import Button from '$lib/components/forms/button/Button.svelte';
	import { changeTheme } from '$lib/index';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import DemoCard from '$lib/components/demo/DemoCard.svelte';
	import DemoContent from '$lib/components/demo/DemoContent.svelte';

	export let data;

	$: components = data.components;
	$: loading = true;

	$: showcase = data.showcase;

	$: library = data.library;

	onMount(async () => {
		try {
			loading = false;
		} catch (error) {
			console.error('Error fetching components:', error);
			loading = false;
		}
	});
	$: group = components?.nav;
	$: menuGroup = components?.groups;
</script>

{#if menuGroup && menuGroup.length}
	<Navbar label={library} {group}>
		<Button label="Theme" on:click={() => changeTheme()} />
	</Navbar>
	<div class="page">
		<div class="page-body">
			{#if !loading}
				{#if showcase.length}
					{#each showcase as item}
						{#if item && item.variant && library}
							<DemoContent {library} {...item} />
						{:else if item}
							<div class="demo-card size-{item.size}">
								<DemoCard
									title={item.name}
									path="/components/{item.group}/{item.name}"
									bind:component={item}
									{library}
									componentName={item.name}
									groupName={item.group}
									props={item.showcaseProps}
								></DemoCard>
							</div>
						{/if}
					{/each}
				{:else}
					<p>Component not found.</p>
				{/if}
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.page {
		justify-content: center;
		margin: 0 auto;
		max-width: calc((((var(--page-width)) / 3) * 3) - var(--spacing-large) * 2);
	}

	.page-body {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-large);
		justify-content: center;
		margin: var(--spacing-large);
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
