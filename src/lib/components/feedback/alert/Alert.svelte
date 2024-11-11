<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import './alert.scss';
	import Dropdown from '$lib/components/navigation/dropdown/Dropdown.svelte';
	export let group: any[] = [];

	$: latest = group?.length > 0 ? group[group.length - 1] : null;

	$: activeVariants = Array.from(new Set(group?.map((item) => item.variant)));
	$: groupedVariants = activeVariants?.map((variant) => {
		return {
			variant: variant,
			group: group.filter((item) => item.variant === variant),
			latest: group.filter((item) => item.variant === variant)[0],
			count: group.filter((item) => item.variant === variant).length
		};
	});

	function handleClear() {
		group = [];
	}
	const dispatch = createEventDispatcher();
</script>

{#if latest}
	<div on:click={() => dispatch('click', latest)} class="alert variant-{latest.variant || 'info'}">
		<p class="alert-text">{latest.label}</p>
		<div class="alert-group">
			{#if !!groupedVariants?.length}
				{#each groupedVariants as variantGroup}
					<Dropdown
						group={variantGroup.group}
						label="{variantGroup.count} {variantGroup.variant}"
						anchor="right"
						size="tiny"
					/>
				{/each}
			{/if}
			<button class="alert-text" on:click={handleClear}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="1em"
					height="1em"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon-cross"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>
	</div>
{/if}
