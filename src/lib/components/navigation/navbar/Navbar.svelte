<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/forms/button/Button.svelte';
	import Dropdown from './../dropdown/Dropdown.svelte';
	import './navbar.scss';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import { createEventDispatcher } from 'svelte';
	export let label: string = '';
	export let id: string = '';
	export let href: string = '/';
	export let group: any[] = [];
	export let gap: string = 'small';
	export let variant: string = 'over';
	export let direction: string = 'right';
	const customEvent = createEventDispatcher();
	let active = false;

	const handleClick = (e) => {
		active = false;
		if (e.detail.href) {
			window.location.href = e.detail.href;
		} else {
			customEvent('click', e.detail);
		}
	};
</script>

<nav class="navbar">
	<a class="navbar-title" {href}>
		{label}
	</a>

	<div class="navbar-menu gap-{gap}">
		<slot />

		<div class="nav-buttons">
			{#each group as item}
				{#if !active}
					<div transition:fade>
						<Dropdown
							group={item.group}
							label={item.label}
							anchor="right"
							on:click={(e) => handleClick(e)}
							id={item.id}
							href={item.href}
						/>
					</div>
				{/if}
			{/each}
		</div>
		<div class="drawer-button">
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
	</div>
</nav>
<Sidebar {direction} {variant} {group} {label} bind:active />
