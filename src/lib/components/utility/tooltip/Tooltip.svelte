
<script lang="ts">
    import './Tooltip.scss';
    import handleTooltip from './Tooltip.js';
    export let label: string = '';

    handleTooltip();
</script>

<div class="Tooltip-container">Tooltip Placeholder{label}</div>
