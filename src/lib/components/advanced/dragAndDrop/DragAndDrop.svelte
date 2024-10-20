
<script lang="ts">
    import './DragAndDrop.scss';
    import handleDraganddrop from './DragAndDrop.js';
    export let label: string = '';

    handleDraganddrop();
</script>

<div class="DragAndDrop-container">Draganddrop Placeholder{label}</div>
