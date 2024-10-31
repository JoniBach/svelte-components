<script lang="ts">
	import Table from './Table.svelte';

	let value = [
		{ name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
		{ name: 'Jane Smith', email: 'jane@example.com', phone: '555-555-5555' },
		{ name: 'Bob Brown', email: 'bob@example.com', phone: '987-654-3210' }
	];

	const props = [
		{
			label: 'User Table',
			value, // Pass the array of data
			form: true,
			group: [
				{
					variant: 'text',
					name: 'name',
					label: 'Name'
				},
				{
					variant: 'text',
					name: 'email',
					label: 'Email'
				},
				{
					variant: 'text',
					name: 'phone',
					label: 'Phone'
				}
			]
		}
	];
</script>

{#each props as props}
	<div class="demo-variant">
		<Table {...props} />
	</div>
{/each}
