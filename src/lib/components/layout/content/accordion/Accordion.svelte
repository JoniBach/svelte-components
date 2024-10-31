<script lang="ts">
	import Drawer from '../drawer/Drawer.svelte';
	import Button from './../../../forms/buttons/button/Button.svelte';
	import { writable } from 'svelte/store';

	// Array of accordion sections with labels and content
	export let group = [];

	// Variant to control behavior: 'single' (only one section open) or 'multiple' (multiple sections open)
	export let variant: 'single' | 'multiple' = 'single';

	// Store to keep track of active sections
	let activeSections = writable<(number | null)[]>([]);

	// Toggle section based on variant
	function toggleSection(index: number) {
		activeSections.update((current) => {
			if (variant === 'single') {
				// For 'single', only allow one open section at a time
				return current[0] === index ? [] : [index];
			} else {
				// For 'multiple', toggle individual section
				return current.includes(index) ? current.filter((i) => i !== index) : [...current, index];
			}
		});
	}
</script>

<div class="accordion">
	{#each group as section, index}
		<Drawer active={$activeSections.includes(index)}>
			<Button on:click={() => toggleSection(index)} slot="handle">{section.label}</Button>
			<div>
				{section.content}
			</div>
		</Drawer>
	{/each}
</div>

<style>
	.accordion {
		display: flex;
		flex-direction: column;
	}
</style>
