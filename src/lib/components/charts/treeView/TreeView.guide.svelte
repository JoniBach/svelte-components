<script lang="ts">
	import TreeView from './TreeView.svelte';

	const props = {
		label: '!!!'
	};
</script>

<TreeView
	data={{
		name: 'Root',
		children: [
			{ name: 'Child 1', children: [{ name: 'Grandchild 1' }, { name: 'Grandchild 2' }] },
			{ name: 'Child 2' }
		]
	}}
	width={800}
	height={600}
/>
