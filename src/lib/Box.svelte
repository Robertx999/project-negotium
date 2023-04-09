<script lang="ts">
	let classes = '';
	export let shadow = false;
	export { classes as class };
</script>

<div
	class={classes +
		(shadow ? ' shadow-xl shadow-black/5' : '') +
		' p-3 rounded-lg bg-white ring-1 ring-slate-700/10 overflow-hidden'}
>
	<slot />
</div>
