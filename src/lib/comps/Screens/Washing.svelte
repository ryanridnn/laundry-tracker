<script lang="ts">
	import Timer from '../Timer.svelte';
	import { store } from '$lib/stores/index.svelte';
</script>

<div class="flex flex-col justify-center">
	<h2 class="">Washing is started</h2>
	<p class="text-sm text-slate-400">waits for 40 minutes</p>

	<div class="mt-2">
		{#if store.startWashingTime}
			<Timer time={store.startWashingTime} />
		{/if}
	</div>

	<button
		class="btn btn-primary mt-4"
		onclick={() => {
			store.finishWashing();
		}}>Finish Now</button
	>
</div>
