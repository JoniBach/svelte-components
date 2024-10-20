
<script lang="ts">
    import './Toast.scss';
    import handleToast from './Toast.js';
    export let label: string = '';

    handleToast();
</script>

<div class="Toast-container">Toast Placeholder{label}</div>
