// tableLib.js

export function createTable({ data, group }) {
	let sortedData = [...data];
	let sortColumn = null;
	let sortOrder = 'asc';

	function sortBy(columnName) {
		sortColumn = columnName;
		sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		sortedData.sort((a, b) => {
			if (a[columnName] < b[columnName]) return sortOrder === 'asc' ? -1 : 1;
			if (a[columnName] > b[columnName]) return sortOrder === 'asc' ? 1 : -1;
			return 0;
		});
	}

	function getRows() {
		return sortedData;
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
