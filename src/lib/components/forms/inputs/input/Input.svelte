<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type = 'text'; // Input type (text, select, option for radio/checkbox, etc.)
	export let name = ''; // Input name attribute
	export let label = ''; // Label text
	export let value = ''; // Input value
	export let placeholder = ''; // Placeholder text
	export let options = []; // Options for select, checkbox, radio
	export let errors = []; // Validation errors array
	export let checked = false; // Checkbox/radio checked state
	export let rows = 3; // Number of rows for textarea

	const dispatch = createEventDispatcher();

	// Emit the value change event to the parent
	function handleChange(event) {
		const newValue = type === 'checkbox' ? event.target.checked : event.target.value;
		dispatch('input', { name, value: newValue });
	}
</script>

<div class="input-group">
	{#if label}
		<label for={name}>{label}</label>
	{/if}

	{#if type === 'text'}
		<input type="text" id={name} {name} {value} {placeholder} on:input={handleChange} />
	{/if}

	{#if type === 'email'}
		<input type="email" id={name} {name} {value} {placeholder} on:input={handleChange} />
	{/if}

	{#if type === 'password'}
		<input type="password" id={name} {name} {value} {placeholder} on:input={handleChange} />
	{/if}

	{#if type === 'number'}
		<input type="number" id={name} {name} {value} {placeholder} on:input={handleChange} />
	{/if}

	{#if type === 'tel'}
		<input type="tel" id={name} {name} {value} {placeholder} on:input={handleChange} />
	{/if}

	{#if type === 'url'}
		<input type="url" id={name} {name} {value} {placeholder} on:input={handleChange} />
	{/if}

	{#if type === 'textarea'}
		<textarea id={name} {name} {value} {placeholder} {rows} on:input={handleChange}></textarea>
	{/if}

	<!-- Select Dropdown for 'option' type -->
	{#if type === 'select'}
		<select id={name} {name} bind:value on:input={handleChange}>
			{#each options as option}
				<option value={option.value} selected={option.value === value}>{option.label}</option>
			{/each}
		</select>
	{/if}

	<!-- Checkbox/Radio Group for 'option' type -->
	{#if type === 'checkbox' || type === 'radio'}
		{#each options as option}
			<div class="option">
				<input
					{type}
					id="{name}-{option.value}"
					{name}
					value={option.value}
					checked={value === option.value || (type === 'checkbox' && checked)}
					on:change={handleChange}
				/>
				<label for="{name}-{option.value}">{option.label}</label>
			</div>
		{/each}
	{/if}

	<!-- Display custom error messages for this input -->
	{#if errors && errors.length}
		<div class="error-messages">
			{#each errors as error}
				<div class="error-message">{error}</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.input-group {
		margin-bottom: 1rem;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}
	input[type='text'],
	input[type='email'],
	input[type='password'],
	input[type='number'],
	input[type='tel'],
	input[type='url'],
	select,
	textarea {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
	}
	.option {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;
	}
	.option input {
		margin-right: 0.5rem;
	}
	.error-messages {
		color: red;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}
</style>
