<script lang="ts">
	export let field = {};
	export let value = 0;
	const setRating = (rating: number) => {
		value = rating;
	};
</script>

<div>
	{#each Array(field.total) as _, i}
		<span class="star {i < value ? 'filled' : ''}" on:click={() => setRating(i + 1)}> ★ </span>
	{/each}
</div>

<style>
	.star {
		font-size: 2rem;
		cursor: pointer;
		color: gray;
	}
	.star.filled {
		color: gold;
	}
</style>
