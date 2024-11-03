<script lang="ts">
	import './modal.scss';
	import { onMount, createEventDispatcher } from 'svelte';

	export let label: string = '';
	export let active: boolean = false; // Controls modal visibility

	const dispatch = createEventDispatcher(); // Initialize event dispatcher

	let modal: HTMLDivElement;

	// Function to close the modal
	function closeModal() {
		active = false;
		dispatch('close'); // Dispatch a custom 'close' event
	}

	// Adjust dimensions after the modal is mounted
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
		setTimeout(() => {
			if (modal) setInitialDimensions();
		}, 0);
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

	// Apply initial dimensions immediately after mounting
	onMount(() => {
		if (active) setInitialDimensions();
	});
</script>

{#if active}
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
			<div
				class="resize-handle top-right"
				on:mousedown={(e) => startResizing(e, 'top-right')}
			></div>
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
{/if}
