<script lang="ts">
	import Dropdown from './../dropdown/Dropdown.svelte';
	import './Navbar.scss';
	export let label: string = '';
	export let href: string = '/';
	export let group: array = [];
	export let gap: string = 'small';
</script>

<nav class="navbar">
	<a class="navbar-title" {href}>
		{label}
	</a>

	<div class="navbar-menu gap-{gap}">
		{#each group as item}
			<!-- <a class="navbar-link" href={item.href} target={item.target} rel={item.rel}>
				{item.label}
			</a> -->
			<Dropdown group={item.group} label={item.label} anchor="right" />
		{/each}

		<slot />
	</div>
</nav>
