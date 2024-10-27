<script lang="ts">
	import Form from './Form.svelte';

	let value = {
		name: 'test'
	};

	const group = [
		{
			type: 'text',
			name: 'name',
			label: 'Name',
			placeholder: 'Enter your name'
		},
		{
			type: 'text',
			name: 'email',
			label: 'Email',
			value: ''
		},
		{
			type: 'option',
			name: 'new_user',
			label: 'New User',
			value: 'yes',
			options: [
				{ value: 'yes', label: 'Yes' },
				{ value: 'no', label: 'No' }
			]
		},
		{
			type: 'text',
			name: 'password',
			label: 'Password',
			placeholder: 'Enter your password',
			value: '',
			condition: [['new_user', '=', 'yes']]
		}
	];

	const props = {
		label: '!!!',
		group,
		columns: 2 // Specify columns here
	};

	$: console.log(value);
</script>

<Form {...props} bind:value />
