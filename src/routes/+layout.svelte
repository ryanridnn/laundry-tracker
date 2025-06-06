<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();
</script>

<div class="flex min-h-screen items-center justify-center">
	{@render children()}
</div>

<Toaster />
