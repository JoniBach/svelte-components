
<script lang="ts">
    import './DatePicker.scss';
    import handleDatepicker from './DatePicker.js';
    export let label: string = '';

    handleDatepicker();
</script>

<div class="DatePicker-container">Datepicker Placeholder{label}</div>
