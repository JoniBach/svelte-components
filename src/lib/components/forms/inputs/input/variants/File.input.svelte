<script>
	export let field = {
		name: '',
		placeholder: ''
	};
	let value;
</script>

<input
	type="file"
	id={field.name}
	name={field.name}
	bind:value
	placeholder={field.placeholder}
	on:input
/>
