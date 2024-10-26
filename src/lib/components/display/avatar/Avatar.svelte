<script lang="ts">
	import './Avatar.scss';
	import handleAvatar from './avatar.js';

	export let label: string = '';
	export let subtext: string = '';
	export let src: string = '';
	export let variant: string = '';
	export let space: string = '';

	handleAvatar();
</script>

<div class="avatar-wrapper space-{space} {variant} " on:click>
	<div class="avatar {variant}">
		{#if src}
			<img {src} alt={label} class="avatar__image" />
		{:else}
			<span class="avatar__placeholder">{label ? label[0].toUpperCase() : '?'}</span>
		{/if}
	</div>

	{#if label}
		<div class="avatar__text-panel">
			{#if label}
				<span class="avatar__label">{label}</span>
			{/if}
			{#if subtext}
				<span class="avatar__subtext">{subtext}</span>
			{/if}
		</div>
	{/if}
</div>
