<script lang="ts">
	import { writable } from 'svelte/store';

	let state = writable(false);
	export let toggle: (e: boolean) => void;
</script>

<button
	on:click={() => {
		state.update((e) => !e);
		toggle($state);
	}}
	class={($state ? 'after:left-5 bg-blue-700' : 'after:left-0 bg-slate-900/10') +
		' w-12 h-7 relative flex items-center rounded-full ring-1 ring-inset transition-all duration-200 ease-in-out ring-slate-900/5 after:absolute after:h-5 after:w-5 after:m-1 after:rounded-full after:bg-white after:shadow-sm after:ring-1 after:ring-slate-700/10 after:transition-all after:duration-200 after:ease-in-out'}
/>
