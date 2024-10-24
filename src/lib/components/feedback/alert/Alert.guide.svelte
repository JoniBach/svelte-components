<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import ButtonGroup from '$lib/components/forms/buttons/buttonGroup/ButtonGroup.svelte';
	import Alert from './Alert.svelte';

	let group = [];

	$: props = {
		group
	};

	function handleClick(e) {
		const id = e.detail.buttonId;
		const time = new Date();

		// Use a reactive assignment to trigger reactivity in Svelte.
		switch (id) {
			case 'error':
				group = [
					...group,
					{
						label: 'Save error',
						description: "Oops! We couldn't save your document. Please try again later.",
						code: 404,
						variant: 'error',
						time
					}
				];
				break;
			case 'warning':
				group = [
					...group,
					{
						label: 'Space warning',
						description: 'We saved your changes! But you are running out of storage!',
						code: null,
						variant: 'warning',
						time
					}
				];
				break;
			case 'success':
				group = [
					...group,
					{
						label: 'Saved successfully',
						description: 'Nice! Your changes have been successfully saved!',
						code: 200,
						variant: 'success',
						time
					}
				];
				break;
			case 'info':
				group = [
					...group,
					{
						label: 'Storage info',
						description: 'You are currently using 2.5GB of your storage.',
						code: 200,
						variant: 'info',
						time
					}
				];
				break;
			default:
				break;
		}
	}

	const buttons = [
		{
			id: 'error',
			label: 'Error',
			color: 'danger',
			variant: 'outlined'
		},
		{
			id: 'warning',
			label: 'Warning',
			color: 'warning',
			variant: 'outlined'
		},
		{
			id: 'success',
			label: 'Success',
			color: 'success',
			variant: 'outlined'
		},
		{
			id: 'info',
			label: 'Info',
			color: 'info',
			variant: 'outlined'
		}
	];

	function handleAlertClick(e) {
		alert(e.detail.description);
	}
</script>

<div class="demo-variant">
	<Alert {...props} on:click={handleAlertClick} />
	<ButtonGroup id="alert-triggers" label="Open Alert" group={buttons} on:click={handleClick} />
</div>
