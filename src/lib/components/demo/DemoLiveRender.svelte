<script lang="ts">
	export let component: { props: any[]; name: string } = { props: [], name: '' };
	let DynamicComponent: any = null;
	let loading: boolean = true;
	export let componentName: string = '';
	export let groupName: string = '';
	export let componentsDirectory: string = '';
	export let props = {};

	$: if (componentName && groupName) {
		const componentFolderName = componentName[0].toLowerCase() + componentName.slice(1);
		const componentPath = `${componentsDirectory}/${groupName}/${componentFolderName}/${componentName}.svelte`;
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
</script>

{#if component?.props}
	<!-- DemoLiveRender  -->
	<div class="component-demo">
		<svelte:component this={DynamicComponent} {...props}>
			{#if Array.isArray(component?.props)}
				{#each component?.props as prop}
					{#if prop.type === 'slot'}
						{prop.example}
					{/if}
				{/each}
			{/if}
		</svelte:component>
	</div>
{/if}
