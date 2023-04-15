import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

import axios from 'axios';

let stockData: string, period: string;

export const actions = {
	fetchStockData: async ({ cookies, request }) => {
		const data = await request.formData();
		if (data.get('symbol') !== null) {
			cookies.set('symbol', data.get('symbol')!.toString());
		}
		const symbol = cookies.get('symbol');
		if (data.get('period') !== null) {
			cookies.set('period', data.get('period')!.toString());
		}
		const period = cookies.get('period');

		if (symbol === null) {
			console.error('Error: symbol is null');
			return { success: false };
		}

		const TSoptions = {
			method: 'GET',
			url: 'https://real-time-finance-data.p.rapidapi.com/stock-time-series',
			params: { symbol: symbol, period: period, language: 'en' },
			headers: {
				'X-RapidAPI-Key': '5abed89a4dmsh731590b7e88a44fp171144jsncbc81803e3d5',
				'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
			}
		};
		const SOoptions = {
			method: 'GET',
			url: 'https://real-time-finance-data.p.rapidapi.com/stock-overview',
			params: { symbol: symbol, language: 'en' },
			headers: {
				'X-RapidAPI-Key': '5abed89a4dmsh731590b7e88a44fp171144jsncbc81803e3d5',
				'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
			}
		};
		const Noptions = {
			method: 'GET',
			url: 'https://real-time-finance-data.p.rapidapi.com/stock-news',
			params: { symbol: symbol, language: 'en' },
			headers: {
				'X-RapidAPI-Key': '5abed89a4dmsh731590b7e88a44fp171144jsncbc81803e3d5',
				'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
			}
		};

		try {
			const responseTS = await axios.request(TSoptions);
			const responseSO = await axios.request(SOoptions);
			const responseN = await axios.request(Noptions);
			cookies.set(
				'stockData',
				JSON.stringify({
					time_series: responseTS.data,
					stock_overview: responseSO.data,
					news: responseN.data
				})
			);
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ cookies }) => {
	const cookie = { stockData: cookies.get('stockData'), period: cookies.get('period') };
	if (cookie.stockData !== undefined) {
		stockData = cookie.stockData;
	}
	if (cookie.period !== undefined) {
		period = cookie.period;
	}

	return {
		stockData: stockData,
		period: period
	};
};
