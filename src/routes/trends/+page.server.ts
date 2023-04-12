import type { PageServerLoad } from './$types';
import yahooFinance from 'yahoo-finance2';

let symbol = 'BTC-USD';

let date = new Date();
date.setMonth(date.getMonth() - 1);

let getHistoricalData = async (symbol: string) => {
	const response = await yahooFinance.historical(symbol, {
		period1: date
	});

	return response;
};

let getSearchData = async (symbol: string) => {
	const response = await yahooFinance.search(symbol);

	return response;
};

export const actions = {
	symbol: async ({ cookies, request }) => {
		const data = await request.formData();
		const symbol = data.get('symbol');

		if (symbol) {
			cookies.set('symbol', symbol);
		}

		return { success: true };
	}
};

export const load: PageServerLoad = async ({ cookies }) => {
	// console.log(window.location.search);
	// const params = new URLSearchParams(document.URL);

	// if (Object.fromEntries(params.entries()).symbol) {
	// 	symbol = Object.fromEntries(params.entries()).symbol;
	// }

	if (cookies.get('symbol')) {
		symbol = cookies.get('symbol');
	}

	return {
		historicalOfSymbol: getHistoricalData(symbol),
		searchOfSymbol: getSearchData(symbol),
		symbol: symbol
	};
};
