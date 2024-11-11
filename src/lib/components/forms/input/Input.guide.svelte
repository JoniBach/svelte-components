<script lang="ts">
	import Input from './Input.svelte';

	let value = '';
	let errors = {};

	$: field = {
		variant: 'text',
		name: 'name',
		label: 'Name',
		placeholder: 'Enter your name',
		valid: [
			{
				rule: ['name', 'regex', /^[a-zA-Z]+$/],
				message: 'Name must contain only letters'
			}
		]
	};
</script>

<Input {field} {errors} bind:value />
