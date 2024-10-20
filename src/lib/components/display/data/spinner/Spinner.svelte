
<script lang="ts">
    import './Spinner.scss';
    import handleSpinner from './Spinner.js';
    export let label: string = '';

    handleSpinner();
</script>

<div class="Spinner-container">Spinner Placeholder{label}</div>
