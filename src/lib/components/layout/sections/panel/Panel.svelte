
<script lang="ts">
    import './Panel.scss';
    import handlePanel from './Panel.js';
    export let label: string = '';

    handlePanel();
</script>

<div class="Panel-container">Panel Placeholder{label}</div>
