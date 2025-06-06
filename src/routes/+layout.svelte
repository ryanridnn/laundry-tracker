<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			try {
				await navigator.serviceWorker.register('/sw.js');

				navigator.serviceWorker.addEventListener('message', (event) => {
					if (event.data.action === 'NOTIFICATION_TRIGGERED') {
						const audio = new Audio('/notification-sound.wav');

						audio.play().catch((err) => {
							console.log('Failed to play notification sound', err);
						});
					}
				});
			} catch (e) {
				console.log('Service Worker registration failed!', e);
			}
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	{@render children()}
</div>

<Toaster />
