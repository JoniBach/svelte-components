<!-- src/components/Toast.svelte -->
<script>
	import { onDestroy } from 'svelte';
	import { toastStore, removeToast } from './toast';
	import Dialog from '../dialog/Dialog.svelte';

	let toasts = [];
	const unsubscribe = toastStore.subscribe((value) => {
		toasts = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	const handleRemove = (id) => {
		removeToast(id);
	};
</script>

<div class="toast-container">
	{#each toasts as { id, message, type }}
		<Dialog
			label={message}
			group={[{ id: 'clear', label: 'Ok', variant: 'outlined' }]}
			color={type}
			active={true}
			on:clear={(e) => handleRemove(id)}
		/>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.toast {
		background: #333;
		color: white;
		padding: 1rem;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.toast.info {
		background: #2196f3;
	}

	.toast.success {
		background: #4caf50;
	}

	.toast.error {
		background: #f44336;
	}

	.toast button {
		background: none;
		border: none;
		color: white;
		cursor: pointer;
	}
</style>
