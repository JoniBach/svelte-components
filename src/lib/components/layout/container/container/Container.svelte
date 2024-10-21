
<script lang="ts">
    import './Container.scss';
    import handleContainer from './Container.js';
    export let label: string = '';

    handleContainer();
</script>

<div class="Container-container">Container Placeholder{label}</div>
