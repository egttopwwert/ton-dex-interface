import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Token {
    address: string;
    ticker: string,
}

const initialState: Token[] = [
    { address: "TON_address", ticker: "TON" },
    { address: "YANOT_address", ticker: "YANOT" },
    { address: "SQUID_address", ticker: "SQUID" },
];

export const balanceSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {},
});


export const selectTokens = (state: RootState) => state.tokens;

export const selectTokenTicker = (state: RootState, tokenAddress: string) => {
    return state.tokens.find((token) => token.address === tokenAddress)?.ticker;
}; 

export default balanceSlice.reducer;