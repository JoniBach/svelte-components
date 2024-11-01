<script lang="ts">
	import './modal.scss';
	import { onMount, afterUpdate } from 'svelte';

	export let label: string = '';
	export let active: boolean = false; // Controls modal visibility

	let modal: HTMLDivElement;

	// Function to close the modal
	function closeModal() {
		active = false;
	}

	// Adjust dimensions after the modal is mounted or updated
	function setInitialDimensions() {
		const maxWidth = window.innerWidth * 0.9;
		const maxHeight = window.innerHeight * 0.9;

		modal.style.width = `${Math.max(modal.offsetWidth, 400)}px`;
		modal.style.height = `${Math.max(modal.offsetHeight, 300)}px`;

		modal.style.width = `${Math.min(modal.offsetWidth, maxWidth)}px`;
		modal.style.height = `${Math.min(modal.offsetHeight, maxHeight)}px`;
	}

	// Reactive statement to ensure dimensions are set when `active` changes to true
	$: if (active) {
		// Only set dimensions when modal becomes active
		setTimeout(() => {
			if (modal) setInitialDimensions();
		}, 0);
	}

	// Functions to handle dragging and resizing remain unchanged...

	onMount(() => {
		if (active) setInitialDimensions();
	});
</script>

{#if active}
	<div class="modal-overlay">
		<div bind:this={modal} class="modal resizable">
			<div class="modal-header">
				<!-- Grab handle and close button -->
				<div class="grab-handle" on:mousedown={startDragging}>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="5" cy="5" r="2" fill="currentColor" />
						<circle cx="5" cy="12" r="2" fill="currentColor" />
						<circle cx="5" cy="19" r="2" fill="currentColor" />
						<circle cx="12" cy="5" r="2" fill="currentColor" />
						<circle cx="12" cy="12" r="2" fill="currentColor" />
						<circle cx="12" cy="19" r="2" fill="currentColor" />
						<circle cx="19" cy="5" r="2" fill="currentColor" />
						<circle cx="19" cy="12" r="2" fill="currentColor" />
						<circle cx="19" cy="19" r="2" fill="currentColor" />
					</svg>
				</div>
				<button class="close-button" on:click={closeModal}>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						color="var(--color-text)"
						xmlns="http://www.w3.org/2000/svg"
					>
						<line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="2" />
						<line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="2" />
					</svg>
				</button>
				<!-- Centered modal title -->
				{#if label}
					<h2 class="modal-title">{label}</h2>
				{/if}
			</div>
			<div class="modal-content">
				<slot />
			</div>
			{#if $$slots.footer}
				<div class="modal-footer">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.7);
		z-index: 1;
	}

	.modal {
		background: var(--color-panel);
		padding: var(--spacing-large);
		border-radius: var(--spacing-small);
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
		position: fixed;
		display: flex;
		flex-direction: column;
		height: 80vh;
		max-height: 100vh;
		text-align: center;
		width: auto;
	}

	.modal-header {
		padding: var(--spacing-small);
		border-bottom: 1px solid var(--color-border);
		position: relative;
		height: 40px;

		.grab-handle {
			position: absolute;
			top: 5px;
			left: 5px;
			cursor: grab;
			width: 16px;
			height: 16px;

			svg {
				width: 100%;
				height: 100%;
				fill: var(--color-text);
			}
		}

		.close-button {
			position: absolute;
			top: 5px;
			right: 5px;
			background: none;
			border: none;
			cursor: pointer;
			width: 16px;
			height: 16px;

			svg {
				width: 100%;
				height: 100%;
				stroke: var(--color-text);
				stroke-width: 2;
			}
		}
	}

	.modal-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: var(--font-size-large);
		margin: 0;
	}

	.modal-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-medium);
	}

	.modal-footer {
		border-top: 1px solid var(--color-border);
		padding: var(--spacing-small);
	}

	.resize-handle {
		width: 10px;
		height: 10px;
		background-color: var(--color-border);
		position: absolute;
	}

	.resize-handle.top-left {
		top: 0;
		left: 0;
		cursor: nw-resize;
	}
	.resize-handle.top-right {
		top: 0;
		right: 0;
		cursor: ne-resize;
	}
	.resize-handle.bottom-left {
		bottom: 0;
		left: 0;
		cursor: sw-resize;
	}
	.resize-handle.bottom-right {
		bottom: 0;
		right: 0;
		cursor: se-resize;
	}
	.resize-handle.top {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		cursor: n-resize;
		height: 5px;
		width: 100%;
	}
	.resize-handle.bottom {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		cursor: s-resize;
		height: 5px;
		width: 100%;
	}
	.resize-handle.left {
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		cursor: w-resize;
		width: 5px;
		height: 100%;
	}
	.resize-handle.right {
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		cursor: e-resize;
		width: 5px;
		height: 100%;
	}
</style>
