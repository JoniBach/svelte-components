<script lang="ts">
	export let field = {};
	export let value = '';
</script>

<input
	type="datetime-local"
	id={field.name + '-datetime'}
	name={field.name + '-datetime'}
	bind:value
	placeholder={field.placeholder + ' (date and time)'}
	on:input
/>
