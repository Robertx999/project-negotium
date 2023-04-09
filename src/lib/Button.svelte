<script lang="ts">
	import { getContext } from 'svelte';
	import { browser } from '$app/environment';

	export let filled = false;
	export let href = '';
	export let click = () => {};

	const group = getContext('group');
</script>

<button
	on:click={() => {
		click();
		// setTimeout(() => {
		if (browser && href !== '') {
			window.location.href = href;
		}
		// }, 250);
	}}
	class={(filled
		? 'text-white overflow-hidden font-semibold bg-blue-700 focus-visible:outline-blue-700 active:bg-blue-600'
		: 'bg-white active:bg-slate-100 ring-1 ring-slate-700/10') +
		(group
			? ''
			: ' rounded-md shadow-sm focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2') +
		' w-fit px-3.5 py-2.5 overflow-hidden flex items-center justify-center'}
>
	<slot />
</button>
