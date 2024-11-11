<script>
	import { onMount } from 'svelte';
	import DemoContent from '$lib/components/demo/DemoContent.svelte';
	import Input from '$lib/components/forms/input/Input.svelte';
	import Table from '$lib/components/forms/table/Table.svelte';

	export let data;

	$: components = data?.components;
	$: loading = true;
	$: showcase = data?.showcase;
	$: library = data?.library;

	onMount(async () => {
		try {
			loading = false;
		} catch (error) {
			console.error('Error fetching components:', error);
			loading = false;
		}
	});

	$: group = components?.nav;
	$: menuGroup = components?.groups;

	$: console.log('data', data);

	const content = [
		{
			variant: true,
			title: 'Getting Started',
			subtitle: 'with KonUI! 🚀',
			content:
				'KonUI is a collection of accessible, reusable, and customizable components for SvelteKit. Each is a complete component that can be dropped into your application.',
			note: 'Note: KonUI is currently in alpha and under active development. We do not recommend using it in production applications just yet.',
			border: true,
			actions: true
		},
		{
			variant: true,
			subtitle: 'Step 1 - Download KonUI',
			content: 'npm install konui-svelte scss',
			border: true,
			actions: false
		},
		{
			variant: true,
			subtitle: 'Step 2 - Get the stylesheet',
			content:
				'Download this stylesheet and import it into the root +layout.svelte file in your project',
			border: true,
			actions: false,
			code: {
				field: {
					variant: 'json',
					name: 'json',
					label: 'Json',
					placeholder: 'Enter your JSON',
					valid: [],
					width: '100%'
				},
				value: `import '../global.scss';`
			},
			href: 'https://github.com/JoniBach/svelte-components/blob/main/src/global.scss'
		},
		{
			variant: true,
			subtitle: 'Step 3 - Plug in the theme',
			content:
				'Now that you have SCSS in your project, you can import the initTheme() function from the library and call it in the +layout.svelte file.',
			border: true,
			actions: false,
			code: {
				field: {
					variant: 'json',
					name: 'json',
					label: 'Json',
					placeholder: 'Enter your JSON',
					valid: [],
					width: '100%'
				},
				value: `import '../global.scss';
import { initTheme } from '$lib';
// Call the function from the script tag, ideally in your parent +layout.svelte file
initTheme();`
			}
		},
		{
			variant: true,
			subtitle: 'Step 4 - Try a <Button /> ',
			content:
				'How about we try and change the theme of the entire application using one of our shiny new buttons? Simply import the Button and changeTheme() toggle function from the library and use them in your app.',
			border: true,
			actions: false,
			code: {
				field: {
					variant: 'json',
					name: 'json',
					label: 'Json',
					placeholder: 'Enter your JSON',
					valid: [],
					width: '100%'
				},
				value: `<Button label="Change Theme" on:click={() => changeTheme()} />`
			},
			link: '/components/forms/Button'
		},
		{
			variant: true,
			subtitle: 'Step 5 - Explore the components',
			content:
				'Now that you have the theme set up, you can start exploring the components in the library. Check out the components in the sidebar and see what you can build! Or take a look at the complete table below. Happy coding!',
			actions: false
		}
	];

	const value = data?.components?.groups.flatMap((group) =>
		group.components.map((component) => ({
			label: group.label,
			...component,
			statement: `import {${component.name}} from '${data.library}';`
		}))
	);

	const table = {
		label: 'Components List',
		value,
		group: [
			{
				variant: 'text',
				name: 'label',
				label: 'Label'
			},
			{
				variant: 'text',
				name: 'name',
				label: 'Name'
			},
			{
				variant: 'text',
				name: 'statement',
				label: 'Import'
			}
		]
	};

	$: console.log(
		data?.components?.groups.flatMap((group) =>
			group.components.map((component) => ({
				label: group.label,
				statement: `import ${component.name} from '$lib/components/${group.label}/${component.name}.svelte';`,
				...component
			}))
		)
	);
</script>

{#if !loading && menuGroup && menuGroup.length}
	<div class="page">
		<div class="page-body">
			{#each content as item}
				<DemoContent {library} {...item} />
			{/each}
			<div style="width: 100%">
				<Table {...table} />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.page {
		display: flex;
		justify-content: center;
	}

	.page-body {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-large);
		margin: var(--spacing-large);
		justify-content: center;
		max-width: calc((((var(--page-width)) / 3) * 3) - var(--spacing-large) * 2);
	}
</style>
