<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import Dropdown from './../dropdown/Dropdown.svelte';
	import './Navbar.scss';
	export let label: string = '';
	export let href: string = '/';
	export let group: any[] = [];
	export let gap: string = 'small';
	export let sidebar = null;

	let active = false;

	$: console.log(sidebar);
</script>

<nav class="navbar">
	<a class="navbar-title" {href}>
		{label}
	</a>

	<div class="navbar-menu gap-{gap}">
		<slot />

		{#each group as item}
			<!-- <a class="navbar-link" href={item.href} target={item.target} rel={item.rel}>
				{item.label}
			</a> -->
			<Dropdown group={item.group} label={item.label} anchor="right" />
		{/each}
		<Button
			on:click={() => {
				active = !active;
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				fill="currentColor"
			>
				<path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
			</svg>
		</Button>
	</div>
</nav>
{#if sidebar}
	<Sidebar {...sidebar} {active} />
{/if}
