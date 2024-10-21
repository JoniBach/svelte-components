
<script lang="ts">
    import './VirtualScroller.scss';
    import handleVirtualscroller from './VirtualScroller.js';
    export let label: string = '';

    handleVirtualscroller();
</script>

<div class="VirtualScroller-container">Virtualscroller Placeholder{label}</div>
