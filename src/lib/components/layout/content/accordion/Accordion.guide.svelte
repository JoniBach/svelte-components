<script lang="ts">
	import Accordion from './Accordion.svelte';

	let group = [
		{ label: 'Section 1', content: 'Content for section 1' },
		{ label: 'Section 2', content: 'Content for section 2' }
	];

	const props = [
		{
			label: 'single',
			group,
			variant: 'single'
		},
		{
			label: 'multiple',
			group,
			variant: 'multiple'
		}
	];
</script>

{#each props as prop}
	<div class="demo-variant">
		<Accordion {...prop} />
	</div>
{/each}
