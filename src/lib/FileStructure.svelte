<script lang="ts">
	import { onMount } from 'svelte';

	export let structure: any;
</script>

<div>
	<!-- {structure} -->
	{#each Object.entries(structure)[0] as index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="ml-10" on:click={() => console.log(index)}>
			{#if typeof index === typeof ''}
				{index}
			{:else}
				<svelte:self structure={index} />
			{/if}
		</div>
	{/each}
</div>
