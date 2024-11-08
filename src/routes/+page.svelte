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

	$: label = components?.title;
	$: group = components?.nav;
	$: menuGroup = components?.groups;
</script>

{#if menuGroup && menuGroup.length}
	<Navbar {label} {group}>
		<Button label="Theme" on:click={() => changeTheme()} />
	</Navbar>
	<div class="page">
		<div class="page-body">"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."</div>
	</div>
{/if}

<style>
	.page {
	}
	.page-body {
		margin: var(--spacing-large);
	}
</style>
