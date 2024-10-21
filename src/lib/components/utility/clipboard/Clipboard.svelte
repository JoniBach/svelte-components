
<script lang="ts">
    import './Clipboard.scss';
    import handleClipboard from './Clipboard.js';
    export let label: string = '';

    handleClipboard();
</script>

<div class="Clipboard-container">Clipboard Placeholder{label}</div>
