<script lang="ts">
	import Button from './../../../forms/buttons/button/Button.svelte';
	import Modal from './Modal.svelte';

	const props = {
		label: 'Title'
	};
</script>

<Modal {...props}>
	test

	<div slot="footer">
		<Button color="danger" variant="solid">Delete</Button>
		<Button color="success" variant="solid">Save</Button>
	</div>
</Modal>
