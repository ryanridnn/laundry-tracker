<script lang="ts">
	import Start from '$lib/comps/Screens/Start.svelte';
	import Washing from '$lib/comps/Screens/Washing.svelte';
	import FinishedWashing from '$lib/comps/Screens/FinishedWashing.svelte';
	import Drying from '$lib/comps/Screens/Drying.svelte';
	import FinishedAll from '$lib/comps/Screens/FinishedAll.svelte';
	import { Screens, store } from '$lib/stores/index.svelte';
</script>

{#if store.screen === Screens.start}
	<Start />
{:else if store.screen === Screens.washing}
	<Washing />
{:else if store.screen === Screens.finishedWashing}
	<FinishedWashing />
{:else if store.screen === Screens.drying}
	<Drying />
{:else if store.screen === Screens.finishedAll}
	<FinishedAll />
{/if}
