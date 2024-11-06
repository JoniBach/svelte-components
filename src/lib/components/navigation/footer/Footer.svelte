<script lang="ts">
	import './footer.scss';
	export let label: string = '';
	export let group: any[] = [];
</script>

<div class="footer">
	{#each group as column, index}
		<div class="footer-column" id={column.id} data-itemIndex={index}>
			<h2 class="footer-column-label">{column.label}</h2>
			{#each column.group as item}
				<a class="footer-link" href={item.link}>{item.label}</a>
			{/each}
		</div>
	{/each}
</div>
