<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import Confirmdialog from './ConfirmDialog.svelte';

	let active = false;
	const group = [
		{ id: 'cancel', label: 'Cancel', variant: 'outlined', color: 'danger' },
		{ id: 'confirm', label: 'Confirm', variant: 'solid', color: 'success' }
	];

	$: props = {
		label: 'Save document',
		id: 'save-document',
		group,
		active
	};

	const handleConfirm = (e) => {
		alert('confirmed with the following event details:' + JSON.stringify(e.detail));
		active = false;
	};

	const handleCancel = (e) => {
		alert('cancelled with the following event details:' + JSON.stringify(e.detail));
		active = false;
	};
</script>

<Confirmdialog {...props} on:confirm={(e) => handleConfirm(e)} on:cancel={(e) => handleCancel(e)} />

<Button on:click={() => (active = true)}>Open Dialog</Button>
