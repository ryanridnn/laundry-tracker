<script lang="ts">
	import { store } from '$lib/stores/index.svelte';
</script>

<div class="flex flex-col justify-center">
	<h2 class="">Laundry is Completed!!</h2>
	<p class="text-sm text-slate-400">Let's start over</p>

	<button
		class="btn btn-primary mt-4"
		onclick={() => {
			store.reset();
		}}>Start Over</button
	>
</div>
