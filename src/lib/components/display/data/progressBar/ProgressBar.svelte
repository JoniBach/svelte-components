
<script lang="ts">
    import './ProgressBar.scss';
    import handleProgressbar from './ProgressBar.js';
    export let label: string = '';

    handleProgressbar();
</script>

<div class="ProgressBar-container">Progressbar Placeholder{label}</div>
