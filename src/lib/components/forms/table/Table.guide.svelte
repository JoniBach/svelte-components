<script lang="ts">
	import Table from './Table.svelte';

	let value = {
		name: 'test'
	};

	const props = [
		{
			label: 'table',
			group: []
		}
	];
</script>

{#each props as props}
	<div class="demo-variant">
		<Table {...props} on:input />
	</div>
{/each}
