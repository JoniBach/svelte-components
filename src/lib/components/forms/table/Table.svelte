<script lang="ts">
	import Drawer from '$lib/components/navigation/drawer/Drawer.svelte';
	import Form from '../form/Form.svelte';
	import { createTable } from './table.js';

	export let label;
	export let value = [];
	export let group;
	export let form = false;

	const table = createTable({ data: value, group });

	let selectedRowIndex = null;
	let selectedRow = {};
	let isDrawerOpen = false;

	function handleSort(columnName) {
		table.sortBy(columnName);
	}

	function openDrawerForRow(row, index) {
		selectedRow = { ...row };
		selectedRowIndex = index;
		isDrawerOpen = true;
	}

	function closeDrawer() {
		selectedRow = { ...value[selectedRowIndex] };
		isDrawerOpen = false;
		selectedRowIndex = null;
	}

	function handleFormSubmit(event) {
		const updatedRow = event.detail;
		const index = findRowIndexByUniqueField('name', updatedRow.name);
		if (index !== -1) {
			value[index] = updatedRow;
			isDrawerOpen = false;
			selectedRowIndex = null;
		}
	}

	function findRowIndexByUniqueField(field, valueToMatch) {
		return value.findIndex((row) => row[field] === valueToMatch);
	}

	$: showEditColumn = form;
	$: isDrawerVisible = (rowIndex) => isDrawerOpen && selectedRowIndex === rowIndex;
</script>

<div>
	<h2>{label}</h2>
	<table>
		<thead>
			<tr>
				{#each table.group as column}
					<th on:click={() => handleSort(column.name)}>
						{column.label}
						{#if table.sortColumn === column.name}
							{table.sortOrder === 'asc' ? ' 🔼' : ' 🔽'}
						{/if}
					</th>
				{/each}
				{#if showEditColumn}
					<th>Edit</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each table.getRows() as row, index}
				<tr>
					{#each table.group as column}
						<td>{row[column.name] || 'N/A'}</td>
					{/each}
					{#if showEditColumn}
						<td>
							{#if isDrawerVisible(index)}
								<button
									on:click={closeDrawer}
									aria-label="Close Edit Drawer"
									style="background: none; border: none;"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="var(--color-text)"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<line x1="18" y1="6" x2="6" y2="18"></line>
										<line x1="6" y1="6" x2="18" y2="18"></line>
									</svg>
								</button>
							{:else}
								<button
									on:click={() => openDrawerForRow(row, index)}
									aria-label="Edit Row"
									style="background: none; border: none;"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="var(--color-text)"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M12 20h9"></path>
										<path d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z"></path>
									</svg>
								</button>
							{/if}
						</td>
					{/if}
				</tr>
				{#if isDrawerVisible(index)}
					<tr>
						<td colspan={table.group.length + 1}>
							<Drawer active={isDrawerOpen} on:close={closeDrawer}>
								<Form {group} bind:value={selectedRow} on:input={handleFormSubmit} />
							</Drawer>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		padding: var(--spacing-small);
		text-align: left;
		border: 1px solid var(--color-border);
	}
	th {
		cursor: pointer;
	}
</style>
