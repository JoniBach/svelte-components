<script lang="ts">
	import Audio from './Audio.svelte';

	const props = [
		{
			label: 'Applause',
			fileType: 'wav',
			src: '/760997__kevp888__240615-03_fr_applause_indoor.wav',
			width: 'full',
			height: 25
		},
		{
			label: 'Guitar Loop',
			fileType: 'wav',
			src: '/759823__josefpres__guitar-loops-107-02-verison-02-101-bpm.wav',
			height: 25,
			width: 100
		}
	];
</script>

<div class="demo-variant">
	{#each props as prop}
		<Audio {...prop} />
	{/each}
</div>
