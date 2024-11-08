<script lang="ts">
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';
	import Button from '$lib/components/forms/button/Button.svelte';
	import Menu from '$lib/components/navigation/menu/Menu.svelte';
	import { changeTheme } from '$lib/index';

	export let data;

	let loading = false;

	// Use destructured properties directly from `data`

	$: label = data.label;
	$: group = data.group;
	$: menuGroup = data.menuGroup;

	function handleClick(event) {
		goto('/components/' + event.detail.buttonId);
	}
</script>

{#if !loading}
	{#if menuGroup?.length}
		<Navbar {label} {group}>
			<Button label="Theme" on:click={changeTheme} />
		</Navbar>
		<div class="page">
			<Menu
				id="components"
				label="Components"
				group={menuGroup.flatMap((group) =>
					group.components?.map(({ name }) => ({
						label: name,
						id: group.id + '/' + name,
						size: 'xs',
						groupId: group.id
					}))
				)}
				align="left"
				on:click={handleClick}
			/>
			<div class="page-body">
				<slot />
			</div>
		</div>
	{/if}
{:else}
	<p>Loading...</p>
{/if}

<style>
	.page {
		display: flex;
		height: 100vh;
	}
	.page-body {
		margin: var(--spacing-large);
	}
</style>
