<script lang="ts">
	import Breadcrumbs from './Breadcrumbs.svelte';

	const props = {
		group: [
			{ label: 'Home', href: '/' },
			{ label: 'Guide', href: '/guide' },
			{ label: 'Navigation', href: '/guide/navigation' },
			{ label: 'Breadcrumbs', href: '/guide/navigation/breadcrumbs' }
		]
	};
</script>

<div class="demo-contaner">
	<div class="demo-variant">
		<Breadcrumbs {...props} />
	</div>
</div>
