<script lang="ts">
	import { onMount } from 'svelte';

	export let field = { name: 'jsonField', placeholder: 'Edit JSON here...', disabled: false };
	export let value: any = ''; // Allow any type but convert to string for the editor

	let textareaContent: string = '';
	let isValidJSON = true;

	// Initialize the textarea with the stringified value
	onMount(() => {
		textareaContent = stringifyValue(value);
		isValidJSON = isJSON(textareaContent);
	});

	// Convert object to JSON string for initial textarea value
	function stringifyValue(val: any): string {
		if (typeof val === 'object') {
			try {
				return JSON.stringify(val, null, 2);
			} catch (e) {
				console.error('Error stringifying value:', e);
				return String(val);
			}
		}
		return String(val);
	}

	// Check if a string is valid JSON
	function isJSON(content: string): boolean {
		try {
			JSON.parse(content);
			return true;
		} catch (e) {
			return false;
		}
	}

	// Update JSON content and validate it
	function handleInput(event: Event) {
		if (!field.disabled) {
			textareaContent = (event.target as HTMLTextAreaElement).value;
			isValidJSON = isJSON(textareaContent);

			if (isValidJSON) {
				value = JSON.parse(textareaContent);
			} else {
				value = textareaContent;
			}
		}
	}
</script>

<!-- Display JSON content in a textarea -->
<div class="editor-container">
	<textarea
		bind:value={textareaContent}
		placeholder={field.placeholder}
		disabled={field.disabled}
		class:is-invalid={!isValidJSON}
		on:input={handleInput}
	></textarea>
</div>

<style>
	.editor-container {
		position: relative;
	}

	textarea {
		width: 100%;
		height: 100px; /* Adjust height as needed */
		border-radius: var(--spacing-small);
		color: var(--color-text);
		background-color: var(--color-background);
		border: 1px solid #ddd;
		padding: 8px;
		font-family: monospace;
		resize: vertical;
		box-sizing: border-box;
	}

	/* Add styling to indicate invalid JSON */
	textarea.is-invalid {
	}
</style>
