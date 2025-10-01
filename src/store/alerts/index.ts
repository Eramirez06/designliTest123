import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Alert {
  id: string;
  symbol: string;
  cryptoName: string;
  targetPrice: number;
  createdAt: number;
}

interface AlertsState {
  alerts: Alert[];
}

const initialState: AlertsState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert(state, action: PayloadAction<Omit<Alert, 'id' | 'createdAt'>>) {
      const newAlert: Alert = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      state.alerts.push(newAlert);
    },
    removeAlert(state, action: PayloadAction<string>) {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    clearAlerts(state) {
      state.alerts = [];
    },
  },
});

export const {addAlert, removeAlert, clearAlerts} = alertsSlice.actions;
export default alertsSlice.reducer;
