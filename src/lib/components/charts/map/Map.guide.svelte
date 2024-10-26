<script lang="ts">
	import Map from './Map.svelte';

	const props = [
		{
			label: 'Map of Wales',
			data: '/wales.json',
			width: '100%',
			height: 600
		},
		{
			label: 'Map of The World',
			data: 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
			width: '100%',
			height: 600
		}
	];
</script>

{#each props as prop}
	<div class="demo-variant">
		<Map {...prop} />
	</div>
{/each}
