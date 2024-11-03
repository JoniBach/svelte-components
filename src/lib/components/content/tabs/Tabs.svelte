<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let group = [];
	export let active = '';
	import './tabs.scss';

	const dispatch = createEventDispatcher();

	const selectTab = (id) => {
		dispatch('click', { id });
	};
	onMount(() => {
		selectTab(group[0].id);
	});
</script>

<div class="tabs">
	<div class="tab-headers">
		{#each group as tab}
			<div
				class="tab-header {tab.id === active ? 'active' : ''}"
				on:click={() => selectTab(tab.id)}
			>
				{tab.label}
			</div>
		{/each}
	</div>
</div>
<div class="tab-content">
	<slot />
</div>
