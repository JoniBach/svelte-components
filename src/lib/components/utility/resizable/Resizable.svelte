
<script lang="ts">
    import './Resizable.scss';
    import handleResizable from './Resizable.js';
    export let label: string = '';

    handleResizable();
</script>

<div class="Resizable-container">Resizable Placeholder{label}</div>
