<script lang="ts">
	export let component: { props: any[]; name: string } = { props: [], name: '' };
	let DynamicComponent: any = null;
	let loading: boolean = true;
	export let componentName: string = '';
	export let groupName: string = '';
	export let componentsDirectory: string = '';
	export let props = {};

	const componentMap = {
		charts: {
			BarChart: import('../charts/barChart/BarChart.svelte'),
			Gauge: import('../charts/gauge/Gauge.svelte'),
			Heatmap: import('../charts/heatmap/Heatmap.svelte'),
			LineChart: import('../charts/lineChart/LineChart.svelte'),
			Map: import('../charts/map/Map.svelte'),
			PieChart: import('../charts/pieChart/PieChart.svelte'),
			TreeView: import('../charts/treeView/TreeView.svelte')
		},
		content: {
			Accordion: import('../content/accordion/Accordion.svelte'),
			Card: import('../content/card/Card.svelte'),
			Drawer: import('../content/drawer/Drawer.svelte'),
			Modal: import('../content/modal/Modal.svelte'),
			Tabs: import('../content/tabs/Tabs.svelte')
		},
		display: {
			Avatar: import('../display/avatar/Avatar.svelte'),
			ProgressBar: import('../display/progressBar/ProgressBar.svelte'),
			Spinner: import('../display/spinner/Spinner.svelte')
		},
		feedback: {
			Alert: import('../feedback/alert/Alert.svelte'),
			ConfirmDialog: import('../feedback/confirmDialog/ConfirmDialog.svelte'),
			Dialog: import('../feedback/dialog/Dialog.svelte'),
			Toast: import('../feedback/toast/Toast.svelte')
		},
		forms: {
			Button: import('../forms/button/Button.svelte'),
			ButtonGroup: import('../forms/buttonGroup/ButtonGroup.svelte'),
			Form: import('../forms/form/Form.svelte'),
			Input: import('../forms/input/Input.svelte'),
			Table: import('../forms/table/Table.svelte')
		},
		media: {
			Audio: import('../media/audio/Audio.svelte'),
			Carousel: import('../media/carousel/Carousel.svelte')
		},
		navigation: {
			Breadcrumbs: import('../navigation/breadcrumbs/Breadcrumbs.svelte'),
			Dropdown: import('../navigation/dropdown/Dropdown.svelte'),
			Footer: import('../navigation/footer/Footer.svelte'),
			Menu: import('../navigation/menu/Menu.svelte'),
			Navbar: import('../navigation/navbar/Navbar.svelte'),
			Sidebar: import('../navigation/sidebar/Sidebar.svelte')
		}
	};

	// $: if (componentName && groupName) {
	// 	const componentFolderName = componentName[0].toLowerCase() + componentName.slice(1);
	// 	const componentPath = `${componentsDirectory}/${groupName}/${componentFolderName}/${componentName}.svelte`;
	// 	import(/* @vite-ignore */ componentPath)
	// 		.then(({ default: loadedComponent }) => {
	// 			DynamicComponent = loadedComponent;
	// 			loading = false;
	// 		})
	// 		.catch((err) => {
	// 			console.error('Error loading component:', componentPath, err);
	// 			DynamicComponent = null;
	// 		});
	// }

	// Reactive statement to dynamically load the component based on `groupName` and `componentName`
	$: {
		if (groupName && componentName && componentMap[groupName]?.[componentName]) {
			componentMap[groupName][componentName]
				.then((res) => {
					DynamicComponent = res.default;
				})
				.catch((err) => {
					console.error(`Error loading component: ${componentName} in ${groupName}`, err);
					DynamicComponent = null;
				});
		} else {
			DynamicComponent = null;
		}
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
