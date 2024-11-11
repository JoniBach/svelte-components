<script lang="ts">
	import './footer.scss';
	export let label: string = '';
	export let group: any[] = [];
</script>

<div class="footer">
	{#if !!group?.length}
		{#each group as column, index}
			<div class="footer-column" id={column.id} data-itemIndex={index}>
				<h2 class="footer-column-label">{column.label}</h2>
				{#if !!column?.group?.length}
					{#each column.group as item}
						<a class="footer-link" href={item.link}>{item.label}</a>
					{/each}
				{/if}
			</div>
		{/each}
	{/if}
</div>
