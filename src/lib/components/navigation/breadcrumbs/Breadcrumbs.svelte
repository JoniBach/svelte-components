<script lang="ts">
	import './breadcrumbs.scss';
	export let group: any[] = [{ label: '', href: '/' }];
</script>

<ul class="breadcrumbs">
	{#each group as crumb, index}
		<li class="breadcrumb">
			<a href={crumb.href} class="breadcrumb-link" data-itemIndex={index}>
				{crumb.label}
			</a>
		</li>
	{/each}
</ul>
