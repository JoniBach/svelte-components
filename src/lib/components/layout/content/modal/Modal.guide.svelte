<script lang="ts">
	import Button from './../../../forms/button/Button.svelte';
	import Modal from './Modal.svelte';

	$: props = {
		label: 'Title',
		active: false
	};
</script>

<Button on:click={() => (props.active = true)} color="primary" variant="solid">Open Modal</Button>

<Modal on:close={() => (props.active = false)} {...props}>
	test

	<div slot="footer">
		<Button color="danger" variant="solid">Delete</Button>
		<Button color="success" variant="solid">Save</Button>
	</div>
</Modal>
