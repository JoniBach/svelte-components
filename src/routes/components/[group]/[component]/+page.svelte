<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';
	import Button from '$lib/components/forms/button/Button.svelte';
	import Menu from '$lib/components/navigation/menu/Menu.svelte';
	import Table from '$lib/components/forms/table/Table.svelte';
	import { changeTheme } from '$lib/index';
	import Input from '$lib/components/forms/input/Input.svelte';

	let components = { groups: [] };
	let DynamicComponent;
	let componentName,
		groupName,
		component,
		props = {};
	let label, group, menuGroup;
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/components.json');
			components = await response.json();
		} catch (error) {
			console.error('Error fetching components:', error);
		}
	});

	$: componentName = $page.params.component;
	$: groupName = $page.params.group;

	$: if (componentName && groupName) {
		const componentFolderName = componentName[0].toLowerCase() + componentName.slice(1);
		const componentPath = `../../../../lib/components/${groupName}/${componentFolderName}/${componentName}.svelte`;

		import(/* @vite-ignore */ componentPath)
			.then(({ default: loadedComponent }) => {
				DynamicComponent = loadedComponent;
				loading = false;
			})
			.catch((err) => {
				console.error('Error loading component:', componentPath, err);
				DynamicComponent = null;
			});
	}

	$: component = components.groups
		.flatMap((group) => group.components)
		.find((comp) => comp.name === componentName);

	$: props = component ? mapPropsToDefaults(component.props) : {};

	function mapPropsToDefaults(propsArray = []) {
		return propsArray.reduce((acc, { prop, example: defaultValue }) => {
			acc[prop] = defaultValue;
			return acc;
		}, {});
	}

	function handleClick(event) {
		loading = true;
		goto('/components/' + event.detail.buttonId);
	}

	$: {
		const { label: newLabel, nav, groups } = components;
		label = newLabel;
		group = nav;
		menuGroup = groups;
	}

	function generateMockCode() {
		if (!component) return '';
		const propString = Object.entries(props)
			.filter(([key]) => !component.props.some((prop) => prop.prop === key && prop.type === 'slot'))
			.map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
			.join(' ');

		const slotContent = component.props
			.filter((prop) => prop.type === 'slot')
			.map((prop) => prop.example)
			.join('\n');

		if (slotContent) {
			return `import ${component.name} from '${components.library}';\n\n<${component.name} ${propString}>\n  ${slotContent}\n</${component.name}>`;
		} else {
			return `import ${component.name} from '${components.library}';\n\n<${component.name} ${propString} />`;
		}
	}

	$: demoCode = !!component ? generateMockCode() : 'loading example...';
</script>

{#if menuGroup?.length && component}
	<Navbar label={`${label} - ${component.name}`} {group}>
		<Button label="Theme" on:click={changeTheme} />
	</Navbar>
	<div class="component-page">
		<Menu
			id="components"
			label="Components"
			group={menuGroup.flatMap((group) =>
				group.components.map(({ name }) => ({
					label: name,
					id: group.id + '/' + name,
					size: 'xs',
					groupId: group.id
				}))
			)}
			align="left"
			on:click={handleClick}
		/>
		<div class="component-body">
			{#if DynamicComponent && !loading}
				{#if component?.props}
					<svelte:component this={DynamicComponent} {...props}>
						{#if Array.isArray(component?.props)}
							{#each component?.props as prop}
								{#if prop.type === 'slot'}
									{prop.example}
								{/if}
							{/each}
						{/if}
					</svelte:component>
				{/if}
				<Input field={{ variant: 'json', disabled: true }} value={demoCode} />
				<Table
					form
					label="{component.name} props"
					bind:value={component.props}
					group={[
						{ variant: 'text', name: 'prop', label: 'Prop', disabled: true },
						{ variant: 'text', name: 'type', label: 'Type', disabled: true },
						{ variant: 'text', name: 'default', label: 'Default', disabled: true },
						{ variant: 'json', name: 'example', label: 'Example' }
					]}
				/>
			{:else}
				<p>Component loading.</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.component-page {
		display: flex;
		height: 100vh;
	}

	.component-body {
		margin: var(--spacing-large);
		flex-grow: 1;
		overflow: auto;
	}
</style>
