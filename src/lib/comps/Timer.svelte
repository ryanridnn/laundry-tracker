<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';

	let element: HTMLDivElement | null = null;

	const { time }: { time: moment.Moment } = $props();

	const pad = (num: number) => String(num).padStart(2, '0');

	onMount(() => {
		if (element) {
			let curr_time = 0;
			let interval = setInterval(() => {
				curr_time += 500;

				const minutes = Math.floor(curr_time / 60000);

				const seconds = Math.floor((curr_time / 1000) % 60);

				if (element) {
					element.textContent = `${pad(minutes)}:${pad(seconds)}`;
				}
			}, 500);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

<div class="text-center text-xl font-semibold" bind:this={element}>00:00</div>
