import {configureStore} from '@reduxjs/toolkit';
import cryptoReducer from './crypto';
import alertsReducer from './alerts';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
