<script>
	import { onMount } from 'svelte';
	import GuidePage from './GuidePage.svelte';
	import { changeTheme } from '$lib';
	// Import all .svelte files in the components folder, including subdirectories
	const componentModules = import.meta.glob('/src/lib/components/**/*.guide.svelte');
	let components = [];

	// Helper function to get the title by removing the '.guide.svelte' extension
	const getFileTitle = (filename) => filename.replace('.guide.svelte', '');

	// Helper function to create or find a directory in the current tree level
	const getOrCreateDirectory = (directories, title) => {
		let dir = directories.find((item) => item.title === title);
		if (!dir) {
			dir = { title, components: [] }; // Create directory with an empty array of components (children)
			directories.push(dir);
		}
		return dir;
	};

	// Function to format files into an array of objects with titles, paths, and children or component
	const formatComponents = (filePaths) => {
		return filePaths.reduce((tree, filePath) => {
			// Remove the base path and split into parts (folders/files)
			const parts = filePath.replace('/src/lib/components', '').split('/');
			let currentLevel = tree;

			// Traverse through directories
			parts.forEach((part, index) => {
				const title = getFileTitle(part);

				if (index === parts.length - 1) {
					// If it's the last part, it's a file, set the component at the current level
					currentLevel.push({
						component: {
							title,
							path: filePath.replace('/src/lib/components/', '').replace('.guide.svelte', '')
						}
					});
				} else {
					// Otherwise, it's a directory, navigate or create it
					const directory = getOrCreateDirectory(currentLevel, title);
					currentLevel = directory.components; // Move to the children (components array)
				}
			});

			return tree;
		}, []);
	};

	// Function to elevate single-length arrays into a component at that level
	const elevateSingleComponent = (items) => {
		return items.map((item) => {
			if (item.components && item.components.length === 1 && item.components[0].component) {
				// If the directory has exactly one component, promote it to the parent level
				return { ...item, component: item.components[0].component, components: undefined };
			}
			// Recursively handle nested components
			if (item.components) {
				item.components = elevateSingleComponent(item.components);
			}
			return item;
		});
	};

	// Collect the list of file paths on component mount
	onMount(() => {
		const filePaths = Object.keys(componentModules);
		components = formatComponents(filePaths);
		components = elevateSingleComponent(components); // Apply the promotion logic
	});
</script>

<body>
	<GuidePage on:click={changeTheme} {components}>
		<slot />
	</GuidePage>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: 'Roboto', sans-serif;
	}
</style>
