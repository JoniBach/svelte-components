<script lang="ts">
	export let field = {};
	export let value: boolean = false;

	function toggle() {
		value = !value;
	}
</script>

<div class="toggle-container {value ? 'active' : ''}" on:click={toggle}>
	<div class="toggle-knob"></div>
</div>
<input type="hidden" id={field.name} name={field.name} bind:value />

<style>
	.toggle-container {
		display: inline-block;
		width: 50px;
		height: 25px;
		background-color: #ccc;
		border-radius: 25px;
		position: relative;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	.toggle-container.active {
		background-color: #4caf50;
	}
	.toggle-knob {
		width: 23px;
		height: 23px;
		background-color: white;
		border-radius: 50%;
		position: absolute;
		top: 1px;
		left: 1px;
		transition: left 0.3s;
	}
	.toggle-container.active .toggle-knob {
		left: 26px;
	}
</style>
