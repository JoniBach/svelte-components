<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import './carousel.scss';

	export let group: { id?: string; url: string; label: string }[] = []; // Allow optional `id`
	export let interval: number = 3000;
	export let auto: boolean = true;
	export let height: string = '300px';
	export let width: string = '100%';

	let currentIndex: number = 0;
	let intervalId: any;

	// Helper to start and stop auto-slide with a delay after a manual change
	function startAutoSlide() {
		if (auto && group.length > 1) {
			stopAutoSlide(); // Ensure no previous interval is active
			intervalId = setInterval(() => {
				currentIndex = (currentIndex + 1) % group.length;
			}, interval);
		}
	}

	function stopAutoSlide() {
		clearInterval(intervalId);
	}

	// Manually control the slide, pausing auto-slide temporarily
	function goToNextSlide() {
		stopAutoSlide();
		currentIndex = (currentIndex + 1) % group.length;
		startAutoSlide();
	}

	function goToPrevSlide() {
		stopAutoSlide();
		currentIndex = (currentIndex - 1 + group.length) % group.length;
		startAutoSlide();
	}

	// Start auto-slide on mount and clear on destroy
	onMount(() => startAutoSlide());
	onDestroy(() => stopAutoSlide());
</script>

{#if !!group?.length}
	<div
		class="carousel"
		style="height: {height}; width: {width};"
		on:mouseenter={stopAutoSlide}
		on:mouseleave={startAutoSlide}
	>
		<div class="carousel-images" style="transform: translateX(-{currentIndex * 100}%)">
			{#each group as image, index (image.id || index)}
				<div class="carousel-slide" style="min-width: 100%">
					<img
						class="carousel-image"
						src={image.url}
						alt={image.label}
						style="height: 100%; width: 100%; object-fit: contain;"
					/>
				</div>
			{/each}
		</div>

		<div class="carousel-caption">
			{group[currentIndex].label}
		</div>

		<div class="carousel-controls">
			<button class="control" on:click={goToPrevSlide}>‹</button>
			<button class="control" on:click={goToNextSlide}>›</button>
		</div>

		<div class="indicators">
			{#each group as _, index}
				<span
					class={index === currentIndex ? 'indicator active' : 'indicator'}
					on:click={() => {
						stopAutoSlide();
						currentIndex = index;
						startAutoSlide();
					}}
				></span>
			{/each}
		</div>
	</div>
{:else}
	<div>Loading carousel...</div>
{/if}
