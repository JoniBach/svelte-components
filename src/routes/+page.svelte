<script>
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';

	const label = 'Component Library',
		group = [
			{ label: 'Home', href: '/' },
			{ label: 'Guide', href: '/guide' },
			{ label: 'Navigation', href: '/navigation' },
			{ label: 'Sidebar', href: '/sidebar' }
		];
</script>

<Navbar {label} {group} />
