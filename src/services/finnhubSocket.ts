import {updatePrice} from '../store/crypto';
import {FINNHUB_API_KEY} from '../constants';
import {AppDispatch} from '../store/store';

interface TradeData {
  s: string; // symbol
  p: number; // price
  t: number; // timestamp
  v: number; // volume
}

interface WebSocketMessage {
  type: string;
  data?: TradeData[];
}

let ws: WebSocket | null = null;

export const connectToFeed = (symbols: string[], dispatch: AppDispatch) => {
  if (ws) {
    return;
  }

  ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);

  ws.onopen = () => {
    // Subscribe to each stock symbol
    symbols.forEach(symbol => {
      ws?.send(JSON.stringify({type: 'subscribe', symbol: symbol}));
    });
  };

  ws.onmessage = (e: any) => {
    const msg: WebSocketMessage = JSON.parse(e.data as string);
    // Finnhub sends trade data with type 'trade' and an array of data
    if (msg.type === 'trade' && msg.data) {
      msg.data.forEach(trade => {
        if (trade.s && trade.p) {
          // s = symbol, p = price
          dispatch(updatePrice({id: trade.s, price: trade.p.toFixed(2)}));
        }
      });
    }
  };

  ws.onerror = (e: any) => {
    console.log('WebSocket error:', e);
  };

  ws.onclose = () => {
    console.log('WebSocket closed');
    ws = null;
  };
};

export const disconnectFromFeed = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};
