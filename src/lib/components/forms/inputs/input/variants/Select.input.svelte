<script lang="ts">
	export let field = {};
	export let value = '';
</script>

{#if field.group}
	<select id={field.name} name={field.name} bind:value>
		{#each field?.group as option}
			<option value={option.value} selected={option.value === value}>{option.label}</option>
		{/each}
	</select>
{/if}
