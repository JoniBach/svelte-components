<script lang="ts">
	export let field = {};
	export let value = ''; // Input value
	export let errors = []; // Validation errors array

	let DynamicComponent;
	$: dynamicUrl = `./variants/${field.variant.charAt(0).toUpperCase() + field.variant.slice(1)}.input.svelte`;

	$: import(dynamicUrl).then((res) => {
		if (res.default) {
			DynamicComponent = res.default;
		}
	});
</script>

<div class="input-group" style="width: {field.width ? field.width : 'auto'}">
	<!-- label -->
	{#if field.label}
		<label for={field.name}>{field.label}</label>
	{/if}

	<!-- input -->
	{#if DynamicComponent}
		<svelte:component this={DynamicComponent} {field} bind:value />
	{:else}
		<p>Not found</p>
	{/if}

	<!-- errors -->
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
		/* margin-bottom: 1rem; */
	}
	label {
		display: block;
		/* margin-bottom: 0.5rem; */
		font-weight: bold;
	}

	.error-messages {
		color: red;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}
</style>
