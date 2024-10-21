
<script lang="ts">
    import './Breadcrumbs.scss';
    import handleBreadcrumbs from './Breadcrumbs.js';
    export let label: string = '';

    handleBreadcrumbs();
</script>

<div class="Breadcrumbs-container">Breadcrumbs Placeholder{label}</div>
