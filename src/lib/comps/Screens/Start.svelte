<script lang="ts">
	import { store } from '$lib/stores/index.svelte';
</script>

<div class="flex flex-col justify-center">
	<h2>Let's start your laundry</h2>
	<button class="btn btn-primary mt-2" onclick={() => store.startLaundry()}>Start Laundry</button>
</div>
