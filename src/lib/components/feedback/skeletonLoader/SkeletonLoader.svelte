
<script lang="ts">
    import './SkeletonLoader.scss';
    import handleSkeletonloader from './SkeletonLoader.js';
    export let label: string = '';

    handleSkeletonloader();
</script>

<div class="SkeletonLoader-container">Skeletonloader Placeholder{label}</div>
