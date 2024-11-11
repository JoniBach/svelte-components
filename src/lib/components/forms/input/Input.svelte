<script lang="ts">
	export let field = {};
	export let value = ''; // Input value
	export let errors = []; // Validation errors array
	const componentMap = {
		Checkbox: import('./variants/Checkbox.input.svelte'),
		Date: import('./variants/Date.input.svelte'),
		Datetime: import('./variants/Datetime.input.svelte'),
		Email: import('./variants/Email.input.svelte'),
		File: import('./variants/File.input.svelte'),
		Json: import('./variants/Json.input.svelte'),
		Number: import('./variants/Number.input.svelte'),
		Password: import('./variants/Password.input.svelte'),
		Phone: import('./variants/Phone.input.svelte'),
		Radio: import('./variants/Radio.input.svelte'),
		Rating: import('./variants/Rating.input.svelte'),
		Select: import('./variants/Select.input.svelte'),
		Slider: import('./variants/Slider.input.svelte'),
		Text: import('./variants/Text.input.svelte'),
		Textarea: import('./variants/Textarea.input.svelte'),
		Time: import('./variants/Time.input.svelte'),
		Toggle: import('./variants/Toggle.input.svelte'),
		Url: import('./variants/Url.input.svelte')
	};

	let DynamicComponent;
	// $: dynamicUrl =
	// 	!!field?.variant &&
	// 	`./variants/${field.variant.charAt(0).toUpperCase() + field.variant.slice(1)}.input.svelte`;

	// $: dynamicUrl &&
	// 	import(dynamicUrl).then((res) => {
	// 		if (res.default) {
	// 			DynamicComponent = res.default;
	// 		}
	// 	});

	$: componentMap?.[field.variant.charAt(0).toUpperCase() + field.variant.slice(1)].then((res) => {
		console.log(res);
		if (res.default) {
			DynamicComponent = res.default;
		}
	});
</script>

<div class="input-group" style="width: {field?.width ? field.width : 'auto'}">
	{#if field?.name}
		<!-- label -->
		{#if !!field && field?.label}
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
