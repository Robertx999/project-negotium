<script lang="ts">
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';
	import Chart, { type ChartItem } from 'chart.js/auto';
	import { writable, type Writable } from 'svelte/store';

	export let data;

	let inputData: Writable<string>;
	inputData = writable();

	let cont: HTMLCanvasElement;
	let chartData: { date: string; value: number }[];
	chartData = [];

	for (let i of data.historicalOfSymbol) {
		chartData.push({
			date: `${i.date.getDate()}`,
			// ${i.date.toLocaleString('en-us', { month: 'long' }).slice(0, 3)}`
			value: i.close
		});
	}

	onMount(() => {
		let ctx = cont.getContext('2d');
		let gradient = ctx!.createLinearGradient(0, 25, 0, 300);
		gradient.addColorStop(0, 'rgba(29,78,216, 0.7)');
		gradient.addColorStop(0.5, 'rgba(29, 78, 216, 0.7)');
		gradient.addColorStop(1, '#0000');

		new Chart(cont, {
			type: 'line',
			options: {
				animations: {
					tension: {
						duration: 1000,
						easing: 'easeInOutCubic',
						from: 0.4,
						to: 0.1
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false
					}
				},
				scales: {
					x: {
						ticks: {
							font: {
								family: 'Inter'
							}
						}
					},
					y: {
						position: 'right',
						ticks: {
							font: {
								family: 'Inter'
							}
						}
					}
				},
				font: {
					family: 'Inter'
				}
			},
			data: {
				labels: chartData.map((row) => row.date),
				datasets: [
					{
						fill: true,
						backgroundColor: gradient,
						borderColor: 'rgb(29,78,216)',
						label: 'BTC',
						data: chartData.map((row) => row.value),
						pointRadius: 0,
						tension: 0.1
					}
				]
			}
		});
	});
</script>

<div class="flex flex-wrap overflow-hidden items-start p-5 gap-5">
	<Box>
		<form method="POST" action="?/symbol">
			<label>
				Symbol
				<input name="symbol" type="text" />
			</label>
			<button>Search</button>
		</form>
	</Box>
	<Box class="flex flex-col gap-3 w-full">
		<h1>{data.symbol} daily close values</h1>
		<div class="w-full h-full">
			<div class="w-full"><canvas bind:this={cont} /></div>
		</div>
		<div class="flex flex-row gap-1 text-sm">
			<table class="border-separate border-spacing-x-[10px]">
				<tbody>
					<tr>
						<td class="text-slate-500"> Open </td>
						<td> {[...data.historicalOfSymbol].reverse()[0].open.toString().slice(0, 6)} </td>
					</tr>
					<tr>
						<td class="text-slate-500"> High </td>
						<td> {[...data.historicalOfSymbol].reverse()[0].high.toString().slice(0, 6)} </td>
					</tr>
				</tbody>
			</table>
			<div class="w-px bg-slate-200" />
			<table class="border-separate border-spacing-x-[10px]">
				<tbody>
					<tr>
						<td class="text-slate-500"> Vol </td>
						<td> {[...data.historicalOfSymbol].reverse()[0].volume} </td>
					</tr>

					<tr>
						<td class="text-slate-500"> Low </td>
						<td> {[...data.historicalOfSymbol].reverse()[0].low.toString().slice(0, 6)} </td>
					</tr>
				</tbody>
			</table>
		</div>
		<a
			href={'https://finance.yahoo.com/quote/' + data.symbol}
			class="text-xs font-thin text-blue-500"
		>
			More data from Yahoo Finance
		</a>
	</Box>
	<Box>
		<h1 class="mb-1">News</h1>
		<div class="flex flex-col gap-3">
			{#each data.searchOfSymbol.news as el}
				<div class="flex flex-col gap-1 text-sm">
					<div class="text-xs text-slate-500">
						{`${el.providerPublishTime.getHours()}:${el.providerPublishTime.getMinutes()} ${el.providerPublishTime.getDate()} ${el.providerPublishTime
							.toLocaleTimeString('en-us', { month: 'long' })
							.slice(0, 3)}`}
					</div>
					<a href={el.link} class="flex flex-row gap-3">
						<img class="w-10 h-10 rounded-md" src={el.thumbnail?.resolutions[1].url} alt="" />
						{el.title}
					</a>
				</div>
			{/each}
		</div>
	</Box>
</div>
