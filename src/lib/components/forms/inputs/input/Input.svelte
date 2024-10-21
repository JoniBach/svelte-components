
<script lang="ts">
    import './Input.scss';
    import handleInput from './Input.js';
    export let label: string = '';

    handleInput();
</script>

<div class="Input-container">Input Placeholder{label}</div>
