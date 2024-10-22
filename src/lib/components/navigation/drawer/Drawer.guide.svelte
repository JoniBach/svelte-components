<script lang="ts">
	import Drawer from './Drawer.svelte';

	const props = {
		label: 'drawer'
	};
</script>

<div class="demo-variant">
	<Drawer {...props}>
		<div>Drawer Placeholder</div>
	</Drawer>
</div>
