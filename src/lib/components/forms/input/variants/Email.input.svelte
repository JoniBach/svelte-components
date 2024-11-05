<script lang="ts">
	export let field = {};
	export let value = '';
</script>

<input type="email" id={field.name} name={field.name} bind:value placeholder={field.placeholder} />
