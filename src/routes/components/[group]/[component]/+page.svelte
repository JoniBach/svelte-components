<script>
	import Navbar from '$lib/components/navigation/navbar/Navbar.svelte';
	import Button from '$lib/components/forms/button/Button.svelte';
	import { changeTheme } from '$lib/index';
	import { onMount } from 'svelte';
	import Menu from '$lib/components/navigation/menu/Menu.svelte';
	import { page } from '$app/stores';
	import Table from '$lib/components/forms/table/Table.svelte';
	import { goto } from '$app/navigation';
	let components = { groups: [] };
	let DynamicComponent;

	onMount(() => {
		fetch('/components.json')
			.then((res) => res.json())
			.then((data) => {
				components = data;
			})
			.catch((error) => {
				console.error('Error fetching components:', error);
			});
	});

	$: componentName = $page.params.component;
	$: groupName = $page.params.group;

	// Dynamically import the component whenever the URL parameters change
	$: if (componentName && groupName) {
		let componentFolderName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
		let componentPath = `../../../../lib/components/${groupName}/${componentFolderName}/${componentName}.svelte`;

		import(componentPath)
			.then((mod) => {
				DynamicComponent = mod.default;
			})
			.catch((err) => {
				console.error('Error loading component:', componentPath, err);
				DynamicComponent = null;
			});
	}

	function handleClick(e) {
		goto(`/components/${e.detail.buttonGroupId}/${e.detail.buttonId}`);
	}

	$: component = components.groups
		.flatMap((group) => group.components)
		.find((comp) => comp.name === componentName);

	$: props = component ? mapPropsToDefaults(component.props) : {};

	function mapPropsToDefaults(propsArray) {
		if (!propsArray) return {};
		return propsArray.reduce((acc, { prop, example: defaultValue }) => {
			acc[prop] = defaultValue;
			return acc;
		}, {});
	}

	$: label = components?.title;
	$: group = components?.nav;
	$: menuGroup = components?.groups;
</script>

{#if menuGroup && menuGroup.length && component}
	<Navbar label={label + ' - ' + component.name} {group}>
		<Button label="Theme" on:click={() => changeTheme()} />
	</Navbar>
	<div class="page">
		{#each menuGroup as menu}
			<Menu
				id={menu.id}
				label={menu.label}
				on:click={(e) => handleClick(e)}
				group={menu.components.map((component) => ({
					label: component.name,
					id: component.name,
					size: 'xs'
				}))}
				align="left"
			/>
		{/each}
		{#if DynamicComponent && component}
			<div class="page-body">
				<svelte:component this={DynamicComponent} {...props} />
				<Table
					form
					label="{component.name} props"
					bind:value={component.props}
					group={[
						{
							variant: 'text',
							name: 'prop',
							label: 'prop',
							disabled: true
						},
						{
							variant: 'text',
							name: 'type',
							label: 'type',
							disabled: true
						},
						{
							variant: 'text',
							name: 'default',
							label: 'default',
							disabled: true
						},
						{
							variant: 'json',
							name: 'example',
							label: 'example'
						}
					]}
				/>
			</div>
		{:else}
			<p>Not found</p>
		{/if}
	</div>
{/if}

<style>
	.page {
		display: flex;
		height: 100vh;
	}
	.page-body {
		margin: var(--spacing-large);
	}
</style>
