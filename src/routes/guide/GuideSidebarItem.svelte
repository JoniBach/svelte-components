<script lang="ts">
	import GuideSidebarItem from './GuideSidebarItem.svelte';
	export let component = null;
</script>

<div class="display-item-container">
	{#if component}
		{#if component.title}
			{#if component.component}
				<a href="/guide/{component.component.path}">{component.component.title}</a>
			{:else}
				<span>{component.title}</span>
			{/if}
		{/if}

		{#if component.components}
			{#each component.components as child}
				<div class="display-item-sub-container">
					<GuideSidebarItem component={child} />
				</div>
			{/each}
		{/if}
	{/if}
</div>

<style>
	.display-item-sub-container {
		padding-left: 10px;
		border-left: 1px solid #888;
	}
	.display-item-container {
		padding-left: 10px;
	}
	a {
		color: #eee;
		text-decoration: none;
	}
	a:hover {
		background: #444;
	}

	a:hover {
		text-decoration: underline;
	}

	span {
		font-weight: bold;
		margin-top: 10px;
	}

	ul {
		list-style-type: none;
		padding-left: 20px;
	}
</style>
