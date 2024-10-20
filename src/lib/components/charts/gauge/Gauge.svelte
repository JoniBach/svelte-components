
<script lang="ts">
    import './Gauge.scss';
    import handleGauge from './Gauge.js';
    export let label: string = '';

    handleGauge();
</script>

<div class="Gauge-container">Gauge Placeholder{label}</div>
