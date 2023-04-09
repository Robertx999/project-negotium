<script lang="ts">
	import Box from '../lib/Box.svelte';
	import Button from '../lib/Button.svelte';
	import ButtonGroup from '../lib/ButtonGroup.svelte';
</script>

<div class="flex flex-wrap overflow-hidden items-start p-5 gap-5">
	<Box shadow>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum eveniet consectetur odio nobis,
		voluptatum beatae maxime excepturi voluptates, assumenda enim cum, ea autem? Soluta, tenetur
		voluptas minus ex non repellat expedita vel commodi. Neque dignissimos ratione laboriosam natus
		enim iure, ab nobis excepturi minus tempore reprehenderit in repudiandae vero accusamus.
	</Box>

	<Button filled>Click</Button>

	<ButtonGroup>
		<Button>One</Button>
		<Button>Two</Button>
	</ButtonGroup>
</div>
