<script lang="ts">
	import Input from '$lib/components/forms/input/Input.svelte';
	export let component;
	export let props;
	export let library: string = '';

	$: demoCode = !!component ? generateMockCode() : 'loading example...';

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
			return `import ${component.name} from '${library}';\n\n<${component.name} ${propString}>\n  ${slotContent}\n</${component.name}>`;
		} else {
			return `import ${component.name} from '${library}';\n\n<${component.name} ${propString} />`;
		}
	}
</script>

{#if demoCode}
	<Input field={{ variant: 'json', disabled: true, label: 'Code snippet' }} value={demoCode} />
{:else}
	<p>No Code</p>
{/if}
