<script lang="ts">
	export let field = {};
	export let value = 0;

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		value = +target.value;
	};
</script>

<div class="slider-container">
	<input
		type="range"
		class="slider"
		bind:value
		min={field.min}
		max={field.max}
		step={field.step}
		on:input={handleInput}
	/>
	<span>{value}</span>
</div>

<style>
	.slider {
		width: 100%;
	}
</style>
