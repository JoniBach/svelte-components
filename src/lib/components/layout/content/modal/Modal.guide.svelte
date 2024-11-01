<script lang="ts">
	import Button from './../../../forms/buttons/button/Button.svelte';
	import Modal from './Modal.svelte';

	$: props = {
		label: 'Title',
		active: false
	};
</script>

<Button on:click={() => (props.active = true)} color="primary" variant="solid">Open Modal</Button>

<Modal {...props}>
	test

	<div slot="footer">
		<Button color="danger" variant="solid">Delete</Button>
		<Button color="success" variant="solid">Save</Button>
	</div>
</Modal>
