<script lang="ts">
	export let field = {};
	export let value = '';
</script>

{#if field.group}
	{#each field?.group as option}
		<div class="option">
			<input
				type="radio"
				id="{field.name}-{option.value}"
				name={field.name}
				value={option.value}
				bind:group={value}
			/>
			<label for="{field.name}-{option.value}">{option.label}</label>
		</div>
	{/each}
{/if}
