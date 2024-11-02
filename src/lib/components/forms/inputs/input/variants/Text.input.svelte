<script lang="ts">
	export let field = {};
	export let value = '';
</script>

<input
	type="text"
	id={field.name}
	name={field.name}
	bind:value
	placeholder={field.placeholder}
	on:input
/>
