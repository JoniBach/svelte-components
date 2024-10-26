<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import './carousel.scss';

	// Import helper functions
	import {
		nextSlide,
		prevSlide,
		startAutoSlide,
		stopAutoSlide,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp
	} from './carousel.js';

	export let group: { id: string; url: string; label: string }[] = [];
	export let interval: number = 3000;
	export let auto: boolean = true;
	export let height: string = '300px';
	export let width: string = '100%';

	let currentIndex: number = 0;
	let intervalId: any;
	let startX: number = 0;
	let endX: number = 0;
	let isDragging: boolean = false;

	// Helper functions to manage endX and intervalId
	function setStartX(val: number) {
		startX = val;
	}

	function setEndX(val: number) {
		endX = val;
	}

	function setIsDragging(val: boolean) {
		isDragging = val;
	}

	function setIntervalId(id: any) {
		intervalId = id;
	}

	// Helper to clear auto-slide temporarily without immediate reset
	function clearAutoSlide() {
		stopAutoSlide(intervalId);
		intervalId = null; // Explicitly clear intervalId
	}

	// Restart auto-slide after a slight delay
	function restartAutoSlide() {
		if (auto && group.length > 0) {
			setTimeout(() => {
				startAutoSlide(auto, interval, updateCurrentIndex, setIntervalId, group.length);
			}, 500); // Short delay to prevent immediate interference
		}
	}

	// Update function for currentIndex
	function updateCurrentIndex(updateFn: Function) {
		currentIndex = updateFn(currentIndex);
	}

	// Start auto-slide on mount, if enabled
	onMount(() => {
		if (auto && group.length > 0) {
			startAutoSlide(auto, interval, updateCurrentIndex, setIntervalId, group.length);
		}
	});

	// Clear auto-slide on destroy
	onDestroy(() => {
		stopAutoSlide(intervalId);
	});

	// Handle next and previous button clicks with interval control
	function handlePrevClick() {
		clearAutoSlide();
		currentIndex = prevSlide(currentIndex, group.length);
		restartAutoSlide();
	}

	function handleNextClick() {
		clearAutoSlide();
		currentIndex = nextSlide(currentIndex, group.length);
		restartAutoSlide();
	}
</script>

{#if group.length > 0}
	<div
		class="carousel"
		on:mouseenter={() => clearAutoSlide()}
		on:mouseleave={() => restartAutoSlide()}
		style="height: {height}; width: {width}"
		on:touchstart={(event) => handleTouchStart(event, setStartX, setIsDragging, clearAutoSlide)}
		on:touchmove={(event) => handleTouchMove(event, isDragging, setEndX)}
		on:touchend={() => {
			currentIndex = handleTouchEnd(
				startX,
				endX,
				isDragging,
				auto,
				interval,
				group.length,
				currentIndex,
				nextSlide,
				prevSlide,
				startAutoSlide,
				clearAutoSlide
			);
			restartAutoSlide();
		}}
		on:mousedown={(event) => handleMouseDown(event, setStartX, setIsDragging, clearAutoSlide)}
		on:mousemove={(event) => handleMouseMove(event, isDragging, setEndX)}
		on:mouseup={() => {
			currentIndex = handleMouseUp(
				startX,
				endX,
				isDragging,
				auto,
				interval,
				group.length,
				currentIndex,
				nextSlide,
				prevSlide,
				startAutoSlide,
				clearAutoSlide
			);
			restartAutoSlide();
		}}
	>
		<div class="carousel-images" style="transform: translateX({-currentIndex * 100}%)">
			{#each group as image (image.id)}
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
			{#if group[currentIndex]}
				{group[currentIndex].label}
			{/if}
		</div>

		<div class="carousel-controls">
			<button class="control" on:click={handlePrevClick}> ‹ </button>
			<button class="control" on:click={handleNextClick}> › </button>
		</div>

		<div class="indicators">
			{#each group as _, index (group[index].id)}
				<span
					class="indicator {index === currentIndex ? 'active' : ''}"
					on:click={() => {
						clearAutoSlide();
						currentIndex = index;
						restartAutoSlide();
					}}
				></span>
			{/each}
		</div>
	</div>
{:else}
	<div>Loading carousel...</div>
{/if}
