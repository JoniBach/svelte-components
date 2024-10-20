
<script lang="ts">
    import './Sidebar.scss';
    import handleSidebar from './Sidebar.js';
    export let label: string = '';

    handleSidebar();
</script>

<div class="Sidebar-container">Sidebar Placeholder{label}</div>
