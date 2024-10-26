<script lang="ts">
	import './ProgressBar.scss';

	export let label: string = '';
	export let variant = 'separated';
	export let type = 'percentage';
	export let value = 0;
	export let total = 0;

	$: fillValue = type === 'percentage' ? value : total > 0 ? (value / total) * 100 : 0;

	$: fillClass = `progress-fill-${Math.round(fillValue)}`;
</script>

{#if variant === 'separated'}
	<span class="progress-label">{label}</span>
{/if}

<div class={`progress-bar variant-${variant}`}>
	<div class={fillClass} style="width: {fillValue}%;"></div>
	{#if variant === 'inset'}
		<span class="progress-label">{label}</span>
	{/if}
</div>
