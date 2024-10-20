<script lang="ts">
	import GuideSidebarItem from './GuideSidebarItem.svelte';
	export let component = null;
</script>

<div class="display-item-container">
	{#if component}
		{#if component.title}
			{#if component.component}
				<a href={component.path}>{component.title}</a>
			{:else}
				<span>{component.title}</span>
			{/if}
		{/if}

		{#if component.components}
			{#each component.components as child}
				<GuideSidebarItem component={child} />
			{/each}
		{/if}
	{/if}
</div>

<style>
	.display-item-container {
		padding-left: 10px;
		margin-left: 10px;
		border-left: 1px solid #ccc;
	}
	a {
		color: #eee;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	span {
		font-weight: bold;
		margin-left: 10px;
		margin-top: 10px;
	}

	ul {
		list-style-type: none;
		padding-left: 20px;
	}
</style>
