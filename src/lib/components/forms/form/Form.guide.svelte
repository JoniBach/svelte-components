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
			placeholder: 'Enter your name',
			valid: [
				{
					rule: ['new_user', 'regex', /^[a-zA-Z]+$/],
					message: 'Name must contain only letters'
				}
			]
		},
		{
			type: 'text',
			name: 'email',
			label: 'Email',
			value: '',
			valid: [
				{
					rule: ['new_user', 'regex', /^[a-zA-Z]+$/],
					message: 'Email must contain only letters'
				}
			]
		},
		{
			type: 'select',
			name: 'new_user',
			label: 'New User',
			value: 'yes',
			options: [
				{ value: 'yes', label: 'Yes' },
				{ value: 'no', label: 'No' }
			],
			valid: [
				{
					rule: ['new_user', 'anyMatch', ['yes', 'no']],
					message: 'New User must be either "yes" or "no"'
				}
			]
		},
		{
			type: 'text',
			name: 'password',
			label: 'Password',
			placeholder: 'Enter your password',
			value: '',
			condition: [['new_user', '=', 'yes']],
			valid: [
				{
					rule: ['new_user', 'regex', /.{8,}/],
					message: 'Password must be at least 8 characters long'
				}
			]
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
