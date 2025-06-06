<script lang="ts">
	import Timer from '../Timer.svelte';
	import { store } from '$lib/stores/index.svelte';
</script>

<div class="flex flex-col justify-center">
	<h2 class="">Drying is started</h2>
	<p class="text-sm text-slate-400">waits for 50 minutes</p>

	<div class="mt-2">
		{#if store.startDryingTime}
			<Timer time={store.startDryingTime} />
		{/if}
	</div>

	<button
		class="btn btn-primary mt-4"
		onclick={() => {
			store.finishDrying();
		}}>Finish Now</button
	>
</div>
