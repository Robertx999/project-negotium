<script lang="ts">
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		console.log(data.btc);
	});
</script>

<div class="flex flex-wrap overflow-hidden items-start p-5 gap-5">
	<Box class="w-full">
		<!-- TradingView Widget BEGIN -->
		<div class="tradingview-widget-container">
			<div id="tradingview_16b19" />
			<div class="tradingview-widget-copyright">
				<a href="https://pl.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"
					><span class="blue-text">AAPL wykres giełdowy</span></a
				> od TradingView
			</div>
			<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
			<script type="text/javascript">
				new TradingView.widget({
					autosize: true,
					symbol: 'NASDAQ:AAPL',
					interval: '1',
					timezone: 'Etc/UTC',
					theme: 'light',
					style: '1',
					locale: 'pl',
					toolbar_bg: '#f1f3f6',
					enable_publishing: false,
					hide_top_toolbar: true,
					hide_legend: true,
					save_image: false,
					container_id: 'tradingview_16b19'
				});
			</script>
		</div>
		<!-- TradingView Widget END -->
	</Box>
</div>
