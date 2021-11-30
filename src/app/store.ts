import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import balanceReducer from "../features/account/balanceSlice";
import tokens from "../features/account/tokensSlice";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    tokens: tokens,
    // account: accountReducer,
    // wallet: walletReducer,
    // tokens: tokensReducer,
    // swapTransactions: swapTransactionsReducer,
    // liquidityTransactions: liquidityTransactionsReducer,
    // positions: positionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
