<script lang="ts">
	import { store } from '$lib/stores/index.svelte';
</script>

<div class="flex flex-col justify-center">
	<h2 class="">Washing is finished</h2>
	<p class="text-sm text-slate-400">Continue with the drying</p>

	<button
		class="btn btn-primary mt-4"
		onclick={() => {
			store.continue();
		}}>Continue</button
	>
</div>
