<script lang="ts">
	import GuideSidebarItem from './GuideSidebarItem.svelte';
	export let components = null;
</script>

<div class="sidebar">
	<p class="heading">
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
	.sidebar {
		height: 100%;
		width: 280px;
		background-color: #333;
		color: white;
		overflow-y: scroll;
		flex-shrink: 0;
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
	}

	.heading {
		margin-left: 10px;
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 200px;
		}
	}
</style>
