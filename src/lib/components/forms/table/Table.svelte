<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let group = [];
	export let value = {};

	const dispatch = createEventDispatcher();
</script>
