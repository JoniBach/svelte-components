import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, params }) => {
	let loading = true;
	let components = { groups: [] };
	let component = null;
	let props = {};
	let error = null;

	try {
		// Fetch components data
		const response = await fetch('/components.json');
		components = await response.json();

		// Get component name and group from params
		const componentName = params.component;
		const groupName = params.group;

		// Find the specific component and default props
		component = components.groups
			.flatMap((group) => group.components)
			.find((comp) => comp.name === componentName);

		props = component
			? component.props.reduce((acc, { prop, example: defaultValue }) => {
					acc[prop] = defaultValue;
					return acc;
				}, {})
			: {};

		// Extract additional layout values
		const { label, nav: group, groups: menuGroup } = components;

		loading = false;

		return {
			loading,
			components,
			componentName,
			groupName,
			component,
			props,
			label,
			group,
			menuGroup,
			error
		};
	} catch (err) {
		console.error('Error fetching components:', err);
		error = 'Failed to load components data';
		loading = false;
		return {
			loading,
			error
		};
	}
};
