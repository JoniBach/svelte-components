
<script lang="ts">
    import './GridColumn.scss';
    import handleGridcolumn from './GridColumn.js';
    export let label: string = '';

    handleGridcolumn();
</script>

<div class="GridColumn-container">Gridcolumn Placeholder{label}</div>
