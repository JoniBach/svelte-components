<script lang="ts">
	import Avatar from './Avatar.svelte';

	const props = [
		{
			src: 'https://i.pravatar.cc/300',
			variant: 'circle',
			space: 'tiny'
		},
		{
			label: 'Alex Jones',
			src: 'https://i.pravatar.cc/300',
			variant: 'rounded',
			space: 'small'
		},
		{
			label: 'Alex Jones',
			subtext: 'Admin',
			src: 'https://i.pravatar.cc/300',
			variant: 'square',
			space: 'medium'
		}
	];
</script>

<div class="demo-variant">
	{#each props as prop}
		<Avatar {...prop} />
	{/each}
</div>
