import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// import accountReducer from "../features/account/accountReducer";

export const store = configureStore({
  reducer: {
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
