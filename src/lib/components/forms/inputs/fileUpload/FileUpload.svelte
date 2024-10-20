
<script lang="ts">
    import './FileUpload.scss';
    import handleFileupload from './FileUpload.js';
    export let label: string = '';

    handleFileupload();
</script>

<div class="FileUpload-container">Fileupload Placeholder{label}</div>
