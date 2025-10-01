import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CryptoData {
  id: string;
  name: string;
  price: string;
  percentageChange: string;
  priceChange: string;
  color: string;
  icon: string;
}

interface CryptoState {
  data: {[key: string]: CryptoData};
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  data: {},
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCryptoData(state, action: PayloadAction<{[key: string]: CryptoData}>) {
      state.data = action.payload;
    },
    updatePrice(state, action: PayloadAction<{id: string; price: string}>) {
      const {id, price} = action.payload;
      if (state.data[id]) {
        const oldPrice = parseFloat(state.data[id].price);
        const newPrice = parseFloat(price);

        const initialPrice =
          oldPrice - parseFloat(state.data[id].priceChange || '0');
        const priceChange = newPrice - initialPrice;
        const percentageChange =
          initialPrice !== 0
            ? ((priceChange / initialPrice) * 100).toFixed(2)
            : '0.00';

        state.data[id].price = price;
        state.data[id].percentageChange = percentageChange;
        state.data[id].priceChange = priceChange.toFixed(2);
      }
    },
  },
});

export const {setLoading, setError, setCryptoData, updatePrice} =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
