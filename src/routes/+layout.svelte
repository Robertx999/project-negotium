<script lang="ts">
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import DiskIcon from '$lib/icons/DiskIcon.svelte';
	import ChatIcon from '$lib/icons/ChatIcon.svelte';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import ChartIcon from '$lib/icons/ChartIcon.svelte';
	import TrendsIcon from '$lib/icons/TrendsIcon.svelte';
	import DashboardIcon from '$lib/icons/DashboardIcon.svelte';
	import ChevronUpIcon from '$lib/icons/ChevronUpIcon.svelte';

	import Button from '$lib/Button.svelte';
	import ButtonGroup from '$lib/ButtonGroup.svelte';

	import '/src/app.css';

	import { fade, fly, scale, slide, blur, crossfade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	let btnGroupOffsetWidth: number;
	let buttonsV: Writable<{ name: string; icon: typeof TrendsIcon; href: string }[]>,
		buttonsH: Writable<{ name: string; icon: typeof TrendsIcon; href: string }[]>;
	(buttonsV = writable([])), (buttonsH = writable([]));
	let droppedDown = writable(false);
	let dropDownElement: HTMLDivElement, dropDownButton: HTMLDivElement;

	buttonsH.set([
		{
			name: 'Trends',
			icon: TrendsIcon,
			href: '/trends'
		},
		{
			name: 'Calendar',
			icon: CalendarIcon,
			href: '/calendar'
		},
		{
			name: 'Chat',
			icon: ChatIcon,
			href: '/chat'
		},
		{
			name: 'Dashboard',
			icon: DashboardIcon,
			href: '/'
		}
	]);

	buttonsV.set([
		{
			name: 'Settings',
			icon: SettingsIcon,
			href: '/settings'
		},
		{
			name: 'Files',
			icon: DiskIcon,
			href: '/files'
		},
		{
			name: 'Statistics',
			icon: ChartIcon,
			href: '/statistics'
		}
	]);
</script>

<svelte:body
	on:click={(e) => {
		if ($droppedDown) {
			if (
				!dropDownElement.contains(e.target) &&
				dropDownElement !== e.target &&
				!dropDownButton.contains(e.target) &&
				dropDownButton !== e.target
			) {
				droppedDown.update(() => false);
			}
		}
	}}
/>

<div class="w-full h-full min-w-fit relative overflow-clip">
	<div class="w-screen h-full overflow-auto gradient-mask">
		<slot />
		<div class="h-16" />
	</div>
	<div class="w-full h-fit absolute bottom-0 flex items-center justify-center">
		<div bind:offsetWidth={btnGroupOffsetWidth} class="w-fit flex flex-col items-end justify-end">
			<div bind:this={dropDownElement}>
				{#if $droppedDown}
					<div in:fade={{ duration: 125 }} out:fade={{ delay: 125, duration: 125 }}>
						<div transition:slide={{ duration: 250 }} class="pb-5">
							<ButtonGroup vertical>
								{#each $buttonsV as button}
									<Button
										click={() => {
											droppedDown.update(() => false);
										}}
										href={button.href}
									>
										<svelte:component this={button.icon} />
									</Button>
								{/each}
							</ButtonGroup>
						</div>
					</div>
				{/if}
			</div>
			<div class="pb-5 z-10">
				<ButtonGroup>
					{#each $buttonsH as button}
						<Button href={button.href}>
							<svelte:component this={button.icon} />
						</Button>
					{/each}
					<div bind:this={dropDownButton}>
						{#if $buttonsV.length}
							<Button
								click={() => {
									droppedDown.update((e) => !e);
								}}
							>
								<div class={($droppedDown ? '-scale-y-100' : '') + ' transition-transform'}>
									<ChevronUpIcon />
								</div>
							</Button>
						{/if}
					</div>
				</ButtonGroup>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.gradient-mask {
		mask-image: linear-gradient(180deg, #000 90%, transparent);
	}
</style>
