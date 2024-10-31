export function createTable({ data, group }) {
	let sortColumn = null;
	let sortOrder = 'asc';

	let sortedData = [...data];

	function sortBy(columnName) {
		sortColumn = columnName;
		sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

		// Sorting and reassigning sortedData reactively
		sortedData = [...data].sort((a, b) => {
			if (a[columnName] < b[columnName]) return sortOrder === 'asc' ? -1 : 1;
			if (a[columnName] > b[columnName]) return sortOrder === 'asc' ? 1 : -1;
			return 0;
		});
	}

	function getRows() {
		return sortedData; // Ensure always returns sorted data
	}

	return {
		group,
		getRows,
		sortBy,
		get sortColumn() {
			return sortColumn;
		},
		get sortOrder() {
			return sortOrder;
		}
	};
}
