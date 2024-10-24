<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import './carousel.scss';

	// Import the helper functions
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

	function updateCurrentIndex(updateFn: Function) {
		currentIndex = updateFn(currentIndex);
	}

	onMount(() => {
		if (auto) {
			startAutoSlide(auto, interval, updateCurrentIndex, setIntervalId, group.length);
		}
	});

	onDestroy(() => {
		stopAutoSlide(intervalId);
	});
</script>

<div
	class="carousel"
	on:mouseenter={() => stopAutoSlide(intervalId)}
	on:mouseleave={() =>
		auto && startAutoSlide(auto, interval, updateCurrentIndex, setIntervalId, group.length)}
	style="height: {height}; width: {width}"
	on:touchstart={(event) =>
		handleTouchStart(event, setStartX, setIsDragging, () => stopAutoSlide(intervalId))}
	on:touchmove={(event) => handleTouchMove(event, isDragging, setEndX)}
	on:touchend={() =>
		(currentIndex = handleTouchEnd(
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
			stopAutoSlide
		))}
	on:mousedown={(event) =>
		handleMouseDown(event, setStartX, setIsDragging, () => stopAutoSlide(intervalId))}
	on:mousemove={(event) => handleMouseMove(event, isDragging, setEndX)}
	on:mouseup={() =>
		(currentIndex = handleMouseUp(
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
			stopAutoSlide
		))}
	on:mouseleave={() =>
		(currentIndex = handleMouseUp(
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
			stopAutoSlide
		))}
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
	<div class="carousel-caption">{group[currentIndex].label}</div>

	<div class="carousel-controls">
		<button class="control" on:click={() => (currentIndex = prevSlide(currentIndex, group.length))}>
			‹
		</button>
		<button class="control" on:click={() => (currentIndex = nextSlide(currentIndex, group.length))}>
			›
		</button>
	</div>

	<div class="indicators">
		{#each group as _, index (group[index].id)}
			<span
				class="indicator {index === currentIndex ? 'active' : ''}"
				on:click={() => {
					stopAutoSlide(intervalId);
					currentIndex = index;
					startAutoSlide(auto, interval, updateCurrentIndex, setIntervalId, group.length);
				}}
			></span>
		{/each}
	</div>
</div>
