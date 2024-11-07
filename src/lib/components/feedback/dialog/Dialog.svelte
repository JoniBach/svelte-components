<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import ButtonGroup from '$lib/components/forms/buttonGroup/ButtonGroup.svelte';

	export let label: string = 'Confirmation';
	export let description: string = 'Are you sure?';
	export let id: string = 'confirm-dialog';
	export let active: boolean = false;
	export let position: string = 'top';
	export let group: string[] = [{ id: 'clear', label: 'Ok', variant: 'outlined', size: 'small' }];
	export let color = 'panel';
	const dispatch = createEventDispatcher();

	const handleClick = (event: CustomEvent) => dispatch(event.detail.buttonId, event.detail);
</script>

<div class="confirm-dialog dialog-{position} {active ? 'active' : ''} color-{color}">
	<p class="dialog-title">{label}</p>
	<div class="dialog-actions">
		<ButtonGroup {id} {group} on:click={(event) => handleClick(event)} />
	</div>
</div>

<style lang="scss">
	.confirm-dialog {
		position: fixed;
		display: flex;
		gap: var(--spacing-small);
		padding: var(--spacing-small);
		border-radius: var(--spacing-small);
		box-shadow: var(--shadow-medium);
		background-color: var(--color-panel);
		opacity: 0;
		transition:
			transform 0.3s ease-in-out,
			opacity 0.3s ease-in-out;
		&.color-success {
			background-color: var(--color-success);
		}
		&.color-warning {
			background-color: var(--color-warning);
		}
		&.color-danger {
			background-color: var(--color-danger);
		}
		&.color-neutral {
			background-color: var(--color-neutral);
		}

		&.active {
			opacity: 1;
		}

		.dialog-title {
			font-size: var(--typography-medium);
			justify-self: center;
			align-content: center;
			margin: 0;
		}

		&.dialog-top {
			top: 0;
			left: 50%;
			transform: translate(-50%, -100%);

			&.active {
				transform: translate(-50%, 0);
			}
		}

		&.dialog-middle {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) scale(0.9);

			&.active {
				transform: translate(-50%, -50%) scale(1);
			}
		}

		&.dialog-left {
			top: 50%;
			left: 0;
			transform: translate(-100%, -50%);

			&.active {
				transform: translate(0, -50%);
			}
		}

		&.dialog-right {
			top: 50%;
			right: 0;
			transform: translate(100%, -50%);

			&.active {
				transform: translate(0, -50%);
			}
		}

		&.dialog-bottom {
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 100%);

			&.active {
				transform: translate(-50%, 0);
			}
		}
	}
</style>
