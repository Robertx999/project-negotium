<script lang="ts">
	import { setContext } from 'svelte';

	export let vertical = false;

	setContext('group', { group: true });
</script>

<div
	class:flex-col={vertical}
	class={'min-w-fit w-min flex overflow-hidden border rounded-md border-slate-300/50 shadow-xs'}
>
	<slot group={true} />
</div>
