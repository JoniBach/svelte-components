<script lang="ts">
	import Drawer from '$lib/components/content/drawer/Drawer.svelte';
	import Form from '../form/Form.svelte';

	export let label;
	export let value = [];
	export let group;
	export let form = false;

	let sortedRows = [...value];
	let selectedRowIndex = null;
	let selectedRow = {};
	let isDrawerOpen = false;
	let sortColumn = null;
	let sortOrder = 'reset'; // 'reset' as the initial state

	// Reactive sorting
	$: sortedRows =
		sortOrder === 'reset'
			? [...value]
			: [...value].sort((a, b) => {
					if (!sortColumn) return 0;
					if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
					if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
					return 0;
				});

	function handleSort(columnName) {
		// Cycle sorting order through 'asc' -> 'desc' -> 'reset'
		if (sortColumn === columnName) {
			sortOrder = sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'reset' : 'asc';
		} else {
			sortOrder = 'asc';
			sortColumn = columnName;
		}
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
				{#each group as column}
					<th on:click={() => handleSort(column.name)}>
						{column.label}
						<!-- Always show the SVG with both up and down arrows -->
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<!-- Up arrow -->
							<path
								d="M12 8l-4 4h8l-4-4z"
								stroke={sortColumn === column.name && sortOrder === 'asc'
									? 'var(--color-text)'
									: 'var(--color-neutral)'}
							></path>
							<!-- Down arrow -->
							<path
								d="M12 16l4-4H8l4 4z"
								stroke={sortColumn === column.name && sortOrder === 'desc'
									? 'var(--color-text)'
									: 'var(--color-neutral)'}
							></path>
						</svg>
					</th>
				{/each}
				{#if showEditColumn}
					<th>Edit</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each sortedRows as row, index}
				<tr>
					{#each group as column}
						<td>
							{#if column.variant === 'json'}
								{JSON.stringify(row[column.name] || {}, null, 2)}
							{:else}
								{row[column.name] || 'N/A'}
							{/if}
						</td>
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
						<td colspan={group.length + 1}>
							<Drawer active={isDrawerOpen} on:close={closeDrawer}>
								<Form {group} bind:value={value[selectedRowIndex]} on:input={handleFormSubmit} />
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
