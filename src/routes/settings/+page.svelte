<script>
	import Box from '$lib/Box.svelte';
	import Switch from '$lib/Switch.svelte';
	import { writable } from 'svelte/store';

	let b = writable(false);
</script>

<div class="flex flex-wrap overflow-hidden items-start p-5 gap-5">
	<Switch
		toggle={(e) => {
			b.update(() => e);
		}}
	/>
	<Box>
		{$b}
	</Box>
	<Box
		>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quod, assumenda maxime vel, iure
		sequi velit, tempore optio numquam quidem cum perferendis odio fugiat odit labore modi earum
		laudantium nihil doloribus nobis dolores blanditiis! Hic fugit eius, aspernatur ipsa totam iure
		pariatur quae culpa consequuntur dolorem ab at commodi nam aliquid exercitationem dolore optio
		quibusdam minima fugiat eveniet. Molestiae iste quia ad reiciendis, sint provident quo
		consectetur error dicta cumque unde? Adipisci est ex nihil provident, dignissimos quae placeat
		amet?
	</Box>
</div>
