<script lang="ts">
	import './Breadcrumbs.scss';
	import handleBreadcrumbs from './Breadcrumbs.js';
	export let group: any[] = [{ label: '', href: '/' }];

	handleBreadcrumbs();
</script>

<ul class="breadcrumbs">
	{#each group as crumb, index}
		<li class="breadcrumb">
			<a href={crumb.href} class="breadcrumb-link" data-itemIndex={index}>
				{crumb.label}
			</a>
		</li>
		<!-- {#if index < group.length - 1}
			<span class="separator">/</span>
		{/if} -->
	{/each}
</ul>
