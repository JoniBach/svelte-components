<script lang="ts">
	import { fetchAudioData, togglePlayPause, updateWaveformProgress, seek } from './audio.js';
	export let src: string;
	export let width: string | number = 800;
	export let height: number = 50;
	import './audio.scss';
	let audioBuffer: AudioBuffer | null = null;
	let svgElement: SVGSVGElement;
	let audioElement: HTMLAudioElement;
	let isPlaying = false;
	let volume = 1;

	function setIsPlaying(value: boolean) {
		isPlaying = value;
	}

	// Load audio and draw the waveform when src changes
	$: if (src) {
		fetchAudioData(src, svgElement, setAudioBuffer, height, width);
	}

	function setAudioBuffer(buffer: AudioBuffer) {
		audioBuffer = buffer;
	}

	// Update waveform progress as the audio plays
	$: if (audioElement) {
		audioElement.ontimeupdate = () =>
			updateWaveformProgress(audioElement, svgElement, audioBuffer, width, height);
		audioElement.onended = () => setIsPlaying(false); // Reset to paused when audio ends
	}
</script>

<div
	class="pill-container"
	style="width: {typeof width === 'string' ? '100%' : width + 'px'}; height: {height}px;"
>
	<!-- Play/Pause Button -->
	<div
		class="play-pause-button"
		on:click={() => togglePlayPause(audioElement, isPlaying, setIsPlaying)}
		style="height: {height}px; width: {height}px;"
	>
		{#if isPlaying}
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="6" y="5" width="4" height="14" fill="var(--color-text)" />
				<rect x="14" y="5" width="4" height="14" fill="var(--color-text)" />
			</svg>
		{:else}
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M8 5V19L19 12L8 5Z" fill="var(--color-text)" />
			</svg>
		{/if}
	</div>

	<!-- Waveform Container -->
	<div
		class="waveform-container"
		style="width: calc({typeof width === 'string'
			? '100%'
			: width + 'px'} - {height}px); height: {height}px;"
	>
		<svg
			bind:this={svgElement}
			class="waveform"
			style="height: {height}px;"
			on:click={(event) => seek(event, svgElement, audioElement, audioBuffer, width)}
		></svg>
	</div>
</div>

<audio bind:this={audioElement} {src}></audio>
