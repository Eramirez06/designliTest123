import {COLOR_MAP, CURRENCIES, ICON_MAP, FINNHUB_API_KEY} from '../constants';
import {setCryptoData, setError, setLoading, CryptoData} from '../store/crypto';
import {AppDispatch} from '../store/store';

interface FinnhubQuoteResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export const fetchCryptoData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const prices: {[key: string]: CryptoData} = {};
    await Promise.all(
      CURRENCIES.map(async (symbol: string) => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        );
        const json: FinnhubQuoteResponse = await res.json();

        // Extract crypto name from BINANCE:BTCUSDT format -> BTC
        const cryptoName = symbol.split(':')[1]?.replace('USDT', '') || symbol;

        prices[symbol] = {
          id: symbol,
          name: cryptoName,
          price: json.c?.toFixed(2) || '0.00',
          percentageChange: json.dp?.toFixed(2) || '0.00',
          priceChange: json.d?.toFixed(2) || '0.00',
          color: (COLOR_MAP as any)[symbol] || '#FFFFFF',
          icon: (ICON_MAP as any)[symbol] || 'https://via.placeholder.com/64',
        };
      }),
    );
    dispatch(setCryptoData(prices));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError('Failed to fetch prices'));
  } finally {
    dispatch(setLoading(false));
  }
};
