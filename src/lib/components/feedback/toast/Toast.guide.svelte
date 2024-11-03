<script lang="ts">
	import Button from '$lib/components/forms/buttons/button/Button.svelte';
	import { addToast } from './toast.js';
	import Toast from './Toast.svelte';

	const props = [
		{
			label: 'Success',
			type: 'success',
			duration: 3000
		},
		{
			label: 'Error',
			type: 'danger',
			duration: 3000
		},
		{
			label: 'Warning',
			type: 'warning',
			duration: 3000
		},
		{
			label: 'Info',
			type: '',
			duration: 3000
		}
	];
</script>

<Toast {...props} />
<div class="demo-variant">
	{#each props as prop}
		<Button color={prop.type} on:click={() => addToast(prop.label, prop.type, prop.duration)}
			>{prop.label}</Button
		>
	{/each}
</div>
