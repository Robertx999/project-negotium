<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import Chart, { type ChartItem } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';

	import colors from 'tailwindcss/colors.js';

	import ButtonGroup from '$lib/ButtonGroup.svelte';
	import Button from '$lib/Button.svelte';
	import Box from '$lib/Box.svelte';

	export let data;

	let stockData: any,
		SO = writable({
			symbol: '',
			price: 0,
			name: '',
			currency: '',
			volume: 0,
			open: 0,
			high: 0,
			low: 0
		}),
		TS = writable({}),
		News = writable([
			{ article_photo_url: '', article_title: '', article_url: '', post_time_utc: '', source: '' }
		]);

	let deviation = writable({ string: '', value: 0 });
	let lastElOfResults = writable({
		Date: '',
		Close: 0,
		High: 0,
		Low: 0,
		Open: 0,
		Volume: 0
	});

	let cont: HTMLCanvasElement;
	let chartData: { date: string | Date; value: number }[];
	chartData = [];

	onMount(() => {
		let ctx = cont.getContext('2d');
		let gradient = ctx!.createLinearGradient(0, 25, 0, 300);
		gradient.addColorStop(0, colors.blue[700] + '7c');
		gradient.addColorStop(0.4, '#0000');

		if (data.stockData !== undefined) {
			stockData = JSON.parse(data.stockData);
			if (stockData.stock_overview !== undefined && stockData.stock_overview.status == 'OK') {
				SO.set(stockData.stock_overview.data);
			}
			if (stockData.time_series !== undefined && stockData.time_series.status == 'OK') {
				TS.set(stockData.time_series.data);
			}
			if (stockData.news !== undefined && stockData.news.status == 'OK') {
				News.set(stockData.news.data.news);
			}
			for (let i in stockData.time_series.data.time_series) {
				chartData.push({
					date: new Date(i),
					value: stockData.time_series.data.time_series[i].price
				});
			}
		}

		if (chartData.length > 0) {
			const deviaNum = $SO.price - chartData[0].value;
			deviation.set({
				string: (deviaNum > 0 ? '+' : '') + deviaNum.toFixed(2),
				value: deviaNum
			});
		}

		Chart.defaults.color = colors.slate[700];

		new Chart(cont, {
			type: 'line',
			options: {
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
						type: 'timeseries',
						grid: {
							color: colors.slate[100]
						},
						ticks: {
							// maxRotation: 0,
							// minRotation: 0,
							font: {
								family: 'Inter'
							}
						}
					},
					y: {
						position: 'right',
						grid: {
							color: colors.slate[100]
						},
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
						borderWidth: 1.4,
						backgroundColor: gradient,
						borderColor: colors.blue[700],
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
		<form method="POST" action="?/fetchStockData">
			<label>
				Input Symbol
				<input class="ring-1 ring-slate-300 rounded-md" name="symbol" type="text" />
			</label>
		</form>
	</Box>
	<Box class="flex flex-col gap-1 w-full">
		<div>
			<div class="font-bold">
				{$SO.symbol}
			</div>
			<div>{$SO.name}</div>
		</div>
		<div class="h-px bg-slate-300" />
		<div class="flex gap-2">
			<div class="font-bold">
				{$SO.price}
			</div>
			<div
				class={$deviation.value > 0
					? 'text-emerald-700'
					: $deviation.value == 0
					? 'text-slate-600'
					: 'text-rose-700'}
			>
				{$deviation.string}
			</div>
		</div>
		<div>{$SO.symbol} &CenterDot; {$SO.currency}</div>
		<div class="h-7 my-3 text-sm flex items-center justify-center">
			<form method="POST" action="?/fetchStockData">
				<ButtonGroup>
					<Button filled={data.period == '1D'} name="period" value="1D">1D</Button>
					<Button filled={data.period == '5D'} name="period" value="5D">5D</Button>
					<Button filled={data.period == '1M'} name="period" value="1M">1M</Button>
					<Button filled={data.period == '6M'} name="period" value="6M">6M</Button>
					<Button filled={data.period == 'YTD'} name="period" value="YTD">YTD</Button>
					<Button filled={data.period == '5Y'} name="period" value="5Y">5Y</Button>
				</ButtonGroup>
			</form>
		</div>
		<div class="w-full h-full">
			<div class="w-full"><canvas bind:this={cont} /></div>
		</div>
		<div class="flex gap-3 text-sm">
			<div>
				<div class="flex gap-2 justify-between">
					<div class="text-slate-500">Open</div>
					{$SO.open}
				</div>
				<div class="flex gap-2 justify-between">
					<div class="text-slate-500">High</div>
					{$SO.high}
				</div>
			</div>
			<div class="w-px bg-slate-200" />
			<div>
				<div class="flex gap-2 justify-between">
					<div class="text-slate-500">Vol</div>
					{new Intl.NumberFormat('en-US', { notation: 'compact' }).format($SO.volume)}
				</div>
				<div class="flex gap-2 justify-between">
					<div class="text-slate-500">Low</div>
					{$SO.low}
				</div>
			</div>
		</div>
		<a
			href={'https://finance.yahoo.com/quote/' + $SO.symbol.slice(0, $SO.symbol.indexOf(':'))}
			class="text-xs font-thin text-blue-500"
		>
			More data from Yahoo Finance
		</a>
	</Box>
	<Box>
		<h1 class="mb-1">News</h1>
		<div class="flex flex-col gap-3">
			{#each $News as el}
				<div class="flex flex-col gap-1 text-sm">
					<div class="text-xs text-slate-500">
						{`${new Date(el.post_time_utc).getHours()}:${new Date(
							el.post_time_utc
						).getMinutes()} ${new Date(el.post_time_utc).getDate()} ${new Date(
							el.post_time_utc
						).toLocaleTimeString('en-us', { month: 'short' })}`}
					</div>
					<a href={el.article_url} class="flex flex-row gap-3">
						<img class="w-10 h-10 rounded-md" src={el.article_photo_url} alt="" />
						{el.article_title}
					</a>
				</div>
			{/each}
		</div>
	</Box>
</div>
