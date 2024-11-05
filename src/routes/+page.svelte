<script>
	import Menu from './../lib/components/navigation/menu/Menu.svelte';
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';
	import Button from '$lib/components/forms/button/Button.svelte';
	import { changeTheme } from '$lib/index';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let components = { groups: [] };

	onMount(() => {
		fetch('/components.json')
			.then((res) => res.json())
			.then((data) => {
				components = data;
			})
			.catch((error) => {
				console.error('Error fetching components:', error);
			});
	});

	function handleClick(e) {
		goto(`/components/${e.detail.buttonGroupId}/${e.detail.buttonId}`);
	}

	$: label = components?.title;
	$: group = components?.nav;
	$: menuGroup = components?.groups;
	$: menuAlign = 'left';
</script>

{#if menuGroup && menuGroup.length}
	<Navbar {label} {group}>
		<Button label="Theme" on:click={() => changeTheme()} />
	</Navbar>
	<div class="page">
		{#each menuGroup as menu}
			<Menu
				id={menu.id}
				label={menu.label}
				group={menu.components.map((component) => ({
					label: component.name,
					id: component.name,
					size: 'xs'
				}))}
				on:click={(e) => handleClick(e)}
				align={menuAlign}
			/>
		{/each}
		<div class="page-body">"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."</div>
	</div>
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
