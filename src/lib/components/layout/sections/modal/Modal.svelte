
<script lang="ts">
    import './Modal.scss';
    import handleModal from './Modal.js';
    export let label: string = '';

    handleModal();
</script>

<div class="Modal-container">Modal Placeholder{label}</div>
