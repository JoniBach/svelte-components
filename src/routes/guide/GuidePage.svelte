<script lang="ts">
	import GuideBody from './GuideBody.svelte';
	import GuideHeadder from './GuideHeadder.svelte';
	import GuideSidebar from './GuideSidebar.svelte';
	export let components: string[] = [];
</script>

<div class="guide-body">
	<GuideHeadder />
	<div class="main-container">
		<GuideSidebar {components} />
		<GuideBody>
			<slot />
		</GuideBody>
	</div>
</div>

<style>
	.main-container {
		display: flex;
		height: calc(100% - 60px);
	}
	.guide-body {
		height: 100vh;
	}
</style>
