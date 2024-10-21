
<script lang="ts">
    import './Popover.scss';
    import handlePopover from './Popover.js';
    export let label: string = '';

    handlePopover();
</script>

<div class="Popover-container">Popover Placeholder{label}</div>
