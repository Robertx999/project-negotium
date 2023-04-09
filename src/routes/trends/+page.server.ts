import { API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

let getData = async () => {
	const response = await fetch(
		'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=' +
			API_KEY,
		{
			method: 'GET',
			headers: { 'User-Agent': 'request' }
		}
	);

	return await response.json();
};

export const load: PageServerLoad = async () => {
	return {
		btc: getData()
	};
};
