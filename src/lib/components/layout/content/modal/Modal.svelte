<script lang="ts">
	import './modal.scss';
	import { onMount } from 'svelte';
	export let label: string = '';

	let modal: HTMLDivElement;

	// Function to close the modal
	function closeModal() {
		modal.style.display = 'none';
	}

	// Adjust dimensions after the modal is mounted
	function setInitialDimensions() {
		const maxWidth = window.innerWidth * 0.9;
		const maxHeight = window.innerHeight * 0.9;

		// Set modal width and height based on content and viewport constraints
		modal.style.width = `${Math.max(modal.offsetWidth, 400)}px`;
		modal.style.height = `${Math.max(modal.offsetHeight, 300)}px`;

		// Apply max constraints to avoid oversized modals
		modal.style.width = `${Math.min(modal.offsetWidth, maxWidth)}px`;
		modal.style.height = `${Math.min(modal.offsetHeight, maxHeight)}px`;
	}

	// Function to handle resizing by dragging from any corner or side
	function startResizing(event: MouseEvent, direction: string) {
		const rect = modal.getBoundingClientRect();
		const startX = event.clientX;
		const startY = event.clientY;

		function resize(event: MouseEvent) {
			let newWidth = rect.width;
			let newHeight = rect.height;
			let newLeft = rect.left;
			let newTop = rect.top;

			if (direction.includes('right')) {
				newWidth = rect.width + (event.clientX - startX);
			} else if (direction.includes('left')) {
				newWidth = rect.width - (event.clientX - startX);
				newLeft = rect.left + (event.clientX - startX);
			}

			if (direction.includes('bottom')) {
				newHeight = rect.height + (event.clientY - startY);
			} else if (direction.includes('top')) {
				newHeight = rect.height - (event.clientY - startY);
				newTop = rect.top + (event.clientY - startY);
			}

			newWidth = Math.max(newWidth, 400);
			newHeight = Math.max(newHeight, 300);

			modal.style.width = `${newWidth}px`;
			modal.style.height = `${newHeight}px`;

			if (direction.includes('left') || direction.includes('top')) {
				modal.style.left = `${newLeft}px`;
				modal.style.top = `${newTop}px`;
			}
		}

		function stopResizing() {
			window.removeEventListener('mousemove', resize);
			window.removeEventListener('mouseup', stopResizing);
		}

		window.addEventListener('mousemove', resize);
		window.addEventListener('mouseup', stopResizing);
	}

	// Function to handle dragging the modal around using the grab handle
	function startDragging(event: MouseEvent) {
		const initialX = event.clientX - modal.offsetLeft;
		const initialY = event.clientY - modal.offsetTop;

		function drag(event: MouseEvent) {
			modal.style.left = `${event.clientX - initialX}px`;
			modal.style.top = `${event.clientY - initialY}px`;
			modal.style.position = 'fixed';
		}

		function stopDragging() {
			window.removeEventListener('mousemove', drag);
			window.removeEventListener('mouseup', stopDragging);
		}

		window.addEventListener('mousemove', drag);
		window.addEventListener('mouseup', stopDragging);
	}

	// Apply initial dimensions immediately after mounting
	onMount(() => {
		setInitialDimensions();
	});
</script>

<div class="modal-overlay">
	<div bind:this={modal} class="modal resizable">
		<div class="modal-header">
			<!-- Grab handle on the top-left -->
			<div class="grab-handle" on:mousedown={startDragging}>
				<!-- SVG Icon for the Grab Handle -->
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

			<!-- Centered modal title -->
			{#if label}
				<h2 class="modal-title">{label}</h2>
			{/if}

			<!-- Close button on the top-right -->
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
		</div>

		<div class="modal-content">
			<slot />
		</div>
		{#if $$slots.footer}
			<div class="modal-footer">
				<slot name="footer" />
			</div>
		{/if}

		<!-- Resize handles in each corner and side -->
		<div class="resize-handle top-left" on:mousedown={(e) => startResizing(e, 'top-left')}></div>
		<div class="resize-handle top-right" on:mousedown={(e) => startResizing(e, 'top-right')}></div>
		<div
			class="resize-handle bottom-left"
			on:mousedown={(e) => startResizing(e, 'bottom-left')}
		></div>
		<div
			class="resize-handle bottom-right"
			on:mousedown={(e) => startResizing(e, 'bottom-right')}
		></div>

		<div class="resize-handle top" on:mousedown={(e) => startResizing(e, 'top')}></div>
		<div class="resize-handle bottom" on:mousedown={(e) => startResizing(e, 'bottom')}></div>
		<div class="resize-handle left" on:mousedown={(e) => startResizing(e, 'left')}></div>
		<div class="resize-handle right" on:mousedown={(e) => startResizing(e, 'right')}></div>
	</div>
</div>

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
