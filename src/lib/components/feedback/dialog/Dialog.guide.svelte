<script lang="ts">
	import Button from '$lib/components/forms/button/Button.svelte';
	import Dialog from './Dialog.svelte';

	let active = false;
	const group = [{ id: 'clear', label: 'Ok', variant: 'outlined' }];

	$: props = {
		label: 'Save document',
		id: 'save-document',
		color: 'success',
		group,
		active
	};

	const handleClear = (e) => {
		alert('Clearing with the following details:' + JSON.stringify(e.detail));
		active = false;
	};
</script>

<Dialog {...props} on:clear={(e) => handleClear(e)} />

<Button on:click={() => (active = true)}>Open Dialog</Button>
