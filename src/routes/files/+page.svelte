<script lang="ts">
	import Box from '$lib/Box.svelte';
	import FileStructure from '$lib/FileStructure.svelte';
	import { onMount } from 'svelte';

	let fileStructure = {
		'C:': [
			{
				photos: [
					{
						wallpapers: ['wall1.png', 'wall2.png', 'wall3.png'],
						avatars: ['a1.jpg', 'a2.jpg']
					},
					'photo1.jpg',
					'photo4.jpg',
					'photo2.png',
					'photo3.jpg'
				]
			}
		]
	};

	onMount(() => {
		console.log(Object.entries(fileStructure));
	});
</script>

<div class="flex flex-wrap overflow-hidden items-start p-5 gap-5">
	<Box class="w-full">
		<FileStructure structure={fileStructure} />
	</Box>
</div>
