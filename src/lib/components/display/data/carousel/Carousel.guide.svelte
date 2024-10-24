<script lang="ts">
	import Carousel from './Carousel.svelte';

	const group = [
		{ id: '1', label: 'lorem ipsum', url: 'https://picsum.photos/600/400' },
		{ id: '2', label: 'dolor sit amet', url: 'https://picsum.photos/600/400' },
		{ id: '3', label: 'consectetur ', url: 'https://picsum.photos/600/400' }
	];
	const props = [
		{
			label: '!!!',
			group,
			auto: false,
			height: '400px'
		},
		{
			label: '!!!',
			group,
			interval: 2000,
			auto: true,
			width: '600px',
			height: '400px'
		}
	];
</script>

{#each props as prop}
	<div class="demo-variant">
		<Carousel {...prop} />
	</div>
{/each}
