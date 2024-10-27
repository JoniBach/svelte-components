<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { checkObjectConditions } from '@jonibach/transform';

	export let group = [];
	export let value = {};
	export let columns: number | undefined; // Optional columns prop
	export let rows: number | undefined; // Optional rows prop

	const dispatch = createEventDispatcher();

	function handleInput(name, event) {
		value[name] = event.target.value;
		dispatch('input', { name, value: value[name], allValues: { ...value } });
	}

	function handleFormatValueObjectToArray(value, group) {
		return group.filter((field) =>
			!!field?.condition ? checkObjectConditions(value, field.condition) : true
		);
	}

	$: groupFilteredByFieldConditions = handleFormatValueObjectToArray(value, group);
</script>

<div
	class="form-container"
	style="
		grid-template-columns: {columns ? `repeat(${columns}, 1fr)` : '1fr'}; 
		grid-auto-rows: {rows ? `repeat(${rows}, 1fr)` : 'auto'};
	"
>
	{#each groupFilteredByFieldConditions as field}
		<div class="form-group">
			<label for={field.name}>{field.label}</label>

			{#if field.type === 'text'}
				<input
					type="text"
					id={field.name}
					placeholder={field.placeholder}
					bind:value={value[field.name]}
					on:input={(e) => handleInput(field.name, e)}
				/>
			{/if}

			{#if field.type === 'option'}
				<select
					id={field.name}
					bind:value={value[field.name]}
					on:input={(e) => handleInput(field.name, e)}
				>
					{#each field.options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			{/if}
		</div>
	{/each}
</div>

<style>
	.form-container {
		display: grid;
		gap: 1rem;
	}
	.form-group {
		margin-bottom: 1rem;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}
	input,
	select {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
	}
</style>
