
<script lang="ts">
    import './Snackbar.scss';
    import handleSnackbar from './Snackbar.js';
    export let label: string = '';

    handleSnackbar();
</script>

<div class="Snackbar-container">Snackbar Placeholder{label}</div>
