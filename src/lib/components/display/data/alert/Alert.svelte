
<script lang="ts">
    import './Alert.scss';
    import handleAlert from './Alert.js';
    export let label: string = '';

    handleAlert();
</script>

<div class="Alert-container">Alert Placeholder{label}</div>
