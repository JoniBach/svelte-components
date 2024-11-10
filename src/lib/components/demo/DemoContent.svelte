<script>
	import { goto } from '$app/navigation';
	import Button from '../forms/button/Button.svelte';
	import Input from '../forms/input/Input.svelte';

	export let variant = '';
	export let title = '';
	export let subtitle = '';
	export let content = '';
	export let note = '';
	export let library = '';
	export let link = '';
	export let href = '';
	export let actions = false;
	export let border = false;
	export let code = null;

	let value = 'npm';
	let copyMessage = ''; // State for showing "Copied to clipboard"

	function handleCopy() {
		// Copy text to clipboard
		navigator.clipboard.writeText(`${value} install -D ${library} scss`);
		// Show message
		copyMessage = 'Copied to clipboard';
		// Reset message after 1.5 seconds
		setTimeout(() => {
			copyMessage = '';
		}, 1500);
	}
</script>

<div class="demo-content-container">
	{#if variant}
		<div class="getting-started">
			{#if title}
				<h1 class="getting-started-title">{title}</h1>
			{/if}
			{#if subtitle}
				<h1 class="getting-started-subtitle">{subtitle}</h1>
			{/if}
			{#if content}
				<p class="getting-started-content">{content}</p>
			{/if}
			{#if note}
				<p class="getting-started-note">{note}</p>
			{/if}
			{#if code}
				<Input {...code} />
			{/if}
			<div class="getting-started-actions">
				{#if actions}
					<Input
						bind:value
						field={{
							variant: 'select',
							name: 'select',
							value: 'npm',
							group: [
								{ value: 'yarn', label: 'yarn' },
								{ value: 'npm', label: 'npm' },
								{ value: 'pnpm', label: 'pnpm' }
							],
							valid: [
								{
									rule: ['select', 'anyMatch', ['option1', 'option2']],
									message: 'Select must be either "Option 1" or "Option 2"'
								}
							]
						}}
					/>
					<Button
						label={copyMessage ? 'Copied!' : `${value} install -D ${library} scss`}
						variant="outlined"
						color="primary"
						on:click={handleCopy}
					/>
				{/if}
				{#if link}
					<Button on:click={(e) => goto(e.detail.href)} href={link} variant="solid" color="primary">
						Get Started <svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="11"
							height="11"
							fill="currentColor"
							><path d="M0 0h24v24H0z" fill="none" /><path
								d="M12 20l-1.41-1.41L16.17 13H4v-2h12.17l-5.58-5.59L12 4l8 8z"
							/></svg
						>
					</Button>
				{/if}
				{#if href}
					<Button
						on:click={() => (window.location.href = href)}
						href={link}
						variant="solid"
						color="primary"
					>
						Go Now <svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="16"
							height="16"
							fill="currentColor"
							><path d="M0 0h24v24H0z" fill="none" /><path
								d="M12 20l-1.41-1.41L16.17 13H4v-2h12.17l-5.58-5.59L12 4l8 8z"
							/></svg
						>
					</Button>
				{/if}
			</div>
		</div>
	{:else}
		<p>No content available for the selected variant.</p>
	{/if}
	{#if border}
		<div class="border"></div>
	{/if}
</div>

<style lang="scss">
	.border {
		border-bottom: 1px solid var(--color-border);
		margin-top: var(--spacing-medium);
		margin-bottom: var(--spacing-xl);
		width: 100%;
	}
	.demo-content-container {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		width: 100%;

		.getting-started {
			display: flex;
			flex-direction: column;
			align-items: start;
			justify-content: start;

			.getting-started-title {
				font-size: var(--typography-extreme);
				color: var(--color-text);
			}

			.getting-started-subtitle {
				font-size: var(--typography-xl);
				color: var(--color-text);
			}

			.getting-started-note {
				color: var(--color-danger);
				font-style: italic;
			}
		}

		.getting-started-actions {
			display: flex;
			flex-direction: row;
			align-items: start;
			justify-content: start;
			gap: var(--spacing-medium);
			margin-bottom: var(--spacing-medium);
			flex-wrap: wrap;
		}
	}
</style>
