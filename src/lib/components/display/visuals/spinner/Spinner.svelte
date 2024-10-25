<script>
	export let size = 'xl'; // default size category
	export let color = 'accent'; // default to a plain string, can be overridden by parent component
	export let borderWidth = 'tiny'; // default border width, plain string
	import './spinner.scss';
</script>

<div
	class="spinner {size} border-{borderWidth}"
	style="--color: var(--color-{color}; --borderWidth: var(--spacing-{borderWidth});"
></div>
