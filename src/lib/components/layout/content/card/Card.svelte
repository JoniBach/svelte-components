
<script lang="ts">
    import './Card.scss';
    import handleCard from './Card.js';
    export let label: string = '';

    handleCard();
</script>

<div class="Card-container">Card Placeholder{label}</div>
