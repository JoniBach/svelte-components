<script>
	import Menu from './../lib/components/navigation/menu/Menu.svelte';
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';
	import Button from '$lib/components/forms/button/Button.svelte';
	import { changeTheme } from '$lib/index';

	const label = 'Component Library',
		group = [
			{ label: 'Home', id: 'Home', href: '/' },
			{ label: 'Components', id: 'Components', href: '/components' }
		],
		menuLabel = 'Components',
		menuGroup = [
			{ label: 'Button', id: '/button' },
			{ label: 'Button Group', id: '/button-group' },
			{ label: 'Dropdown', id: '/dropdown' },
			{ label: 'Menu', id: '/menu' },
			{ label: 'Navbar', id: '/navbar' },
			{ label: 'Sidebar', id: '/sidebar' }
		],
		menuAlign = 'left';
</script>

<Navbar {label} {group}>
	<Button label="Theme" on:click={() => changeTheme()} />
</Navbar>
<div class="page">
	<Menu label={menuLabel} group={menuGroup} align={menuAlign} />
	<div class="page-body">
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	</div>
</div>

<style>
	.page {
		display: flex;
		height: 100vh;
	}
	.page-body {
		margin: var(--spacing-large);
	}
</style>
