
<script lang="ts">
    import './MarkdownRenderer.scss';
    import handleMarkdownrenderer from './MarkdownRenderer.js';
    export let label: string = '';

    handleMarkdownrenderer();
</script>

<div class="MarkdownRenderer-container">Markdownrenderer Placeholder{label}</div>
