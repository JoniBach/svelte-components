
<script lang="ts">
    import './Draggable.scss';
    import handleDraggable from './Draggable.js';
    export let label: string = '';

    handleDraggable();
</script>

<div class="Draggable-container">Draggable Placeholder{label}</div>
