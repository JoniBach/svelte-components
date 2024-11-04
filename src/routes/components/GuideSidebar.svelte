<script lang="ts">
	import GuideSidebarItem from './GuideSidebarItem.svelte';
	export let components = null;
</script>

<div class="guide-sidebar">
	<p class="guide-heading">
		<strong>Components</strong>
	</p>
	{#if components}
		<ul>
			{#each components as component}
				<li>
					<GuideSidebarItem {component} />
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.guide-sidebar {
		height: 100%;
		width: 280px;
		background-color: #333;
		color: white;
		overflow-y: scroll;
		flex-shrink: 0;
	}

	.guide-sidebar ul {
		list-style: none;
		padding: 0;
	}

	.guide-heading {
		margin-left: 10px;
	}

	@media (max-width: 768px) {
		.guide-sidebar {
			width: 200px;
		}
	}
</style>
