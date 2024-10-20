
<script lang="ts">
    import './Badge.scss';
    import handleBadge from './Badge.js';
    export let label: string = '';

    handleBadge();
</script>

<div class="Badge-container">Badge Placeholder{label}</div>
