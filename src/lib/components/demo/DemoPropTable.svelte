<script lang="ts">
	import Table from '$lib/components/forms/table/Table.svelte';

	export let component = { props: [], name: '' };
</script>

{#if component.props.length}
	<Table
		form
		label="{component.name} props"
		bind:value={component.props}
		group={[
			{ variant: 'text', name: 'prop', label: 'Prop', disabled: true },
			{ variant: 'text', name: 'type', label: 'Type', disabled: true },
			{ variant: 'text', name: 'default', label: 'Default', disabled: true },
			{ variant: 'json', name: 'example', label: 'Example' }
		]}
	/>
{:else}
	<p>No props</p>
{/if}
