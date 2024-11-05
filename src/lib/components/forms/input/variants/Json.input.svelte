<script lang="ts">
	import { onMount } from 'svelte';
	import * as monaco from 'monaco-editor';

	export let field = { name: 'jsonField', placeholder: 'Edit JSON here...', disabled: false };
	export let value: any = ''; // Allow any type but convert to string for the editor

	let editorContainer: HTMLDivElement;
	let editorInstance: monaco.editor.IStandaloneCodeEditor;

	onMount(() => {
		const initialValue = stringifyValue(value);
		const language = detectLanguage(initialValue);

		createEditor(initialValue, language);

		return () => {
			if (editorInstance) {
				editorInstance.dispose();
			}
		};
	});

	function createEditor(initialValue: string, language: string) {
		editorInstance = monaco.editor.create(editorContainer, {
			value: initialValue,
			language: language,
			theme: 'vs-light',
			automaticLayout: true,
			minimap: { enabled: false },
			readOnly: field.disabled // Disable editing based on the disabled prop
		});

		editorInstance.onDidChangeModelContent(() => {
			if (!field.disabled) {
				// Prevent changes when disabled
				const editorContent = editorInstance.getValue();
				value = parseValue(editorContent);
				updateLanguage();
			}
		});
	}

	function detectLanguage(content: string): string {
		try {
			JSON.parse(content);
			return 'json';
		} catch (e) {
			return 'javascript';
		}
	}

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

	function parseValue(content: string): any {
		try {
			return JSON.parse(content);
		} catch (e) {
			console.warn('Parsing as string due to invalid JSON:', content);
			return content; // Return as string if not valid JSON
		}
	}

	function updateLanguage() {
		if (editorInstance && editorInstance.getModel()) {
			const currentLanguage = editorInstance.getModel().getLanguageId();
			const detectedLanguage = detectLanguage(editorInstance.getValue());

			if (currentLanguage !== detectedLanguage) {
				monaco.editor.setModelLanguage(editorInstance.getModel(), detectedLanguage);
			}
		}
	}
</script>

<div bind:this={editorContainer} class="editor-container"></div>

<style>
	.editor-container {
		height: 100px; /* Set height as needed */
		border-radius: var(--spacing-small);
		overflow: hidden;
		position: relative;
	}

	/* No additional greying-out styles are applied */
</style>
