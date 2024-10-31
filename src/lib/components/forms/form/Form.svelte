<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { checkObjectConditions } from '@jonibach/transform';
	import Input from '../inputs/input/Input.svelte';
	import Drawer from '$lib/components/navigation/drawer/Drawer.svelte';

	export let group = [];
	export let value = {};
	export let columns: number | undefined;
	export let rows: number | undefined;

	const dispatch = createEventDispatcher();

	let errors = {}; // Track errors for each field with custom messages

	function handleInput(name, event) {
		value[name] = event.target.value;
		validateField(name);
		dispatch('input', { name, value: value[name], allValues: { ...value } });
	}

	function handleFormatValueObjectToArray(value, group) {
		return group.filter((field) =>
			!!field?.condition ? checkObjectConditions(value, field.condition) : true
		);
	}

	$: groupFilteredByFieldConditions = handleFormatValueObjectToArray(value, group);

	function validateField(name) {
		const field = group.find((f) => f.name === name);
		const fieldValue = value[name];
		let fieldErrors = [];

		if (field?.valid) {
			field.valid.forEach(({ rule, message }) => {
				const [fieldName, ruleType, criteria] = rule;

				switch (ruleType) {
					case 'regex':
						if (!criteria.test(fieldValue)) {
							fieldErrors.push(message);
						}
						break;
					case 'anyMatch':
						if (!criteria.includes(fieldValue)) {
							fieldErrors.push(message);
						}
						break;
					default:
						break;
				}
			});
		}

		errors = { ...errors, [name]: fieldErrors };
	}

	$: {
		groupFilteredByFieldConditions.forEach((field) => validateField(field.name));
	}
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
			<Input
				{field}
				bind:value={value[field.name]}
				errors={errors[field.name] || []}
				on:input={(e) => handleInput(field.name, e)}
			/>
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
</style>
