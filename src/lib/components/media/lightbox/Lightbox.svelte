
<script lang="ts">
    import './Lightbox.scss';
    import handleLightbox from './Lightbox.js';
    export let label: string = '';

    handleLightbox();
</script>

<div class="Lightbox-container">Lightbox Placeholder{label}</div>
