import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TokenBalance {
    tokenAddress: string;
    tokenBalance: number,
}

export interface TokenBalanceAction {
    tokenAddress: string;
    balanceDifference: number,
}

const initialState: TokenBalance[] = [
    { tokenAddress: "TON_address",  tokenBalance: 1000 },
    { tokenAddress: "YANOT_address",  tokenBalance: 777 },
];

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    addBalance: (state, action: PayloadAction<TokenBalanceAction>) => {
        const element = state.find((element) => element.tokenAddress === action.payload.tokenAddress);
        
        if (!element) {
            state.push({ tokenAddress: action.payload.tokenAddress, tokenBalance: action.payload.balanceDifference })
        }
        else {
            element.tokenBalance += action.payload.balanceDifference;
        }
    },
    removeBalance: (state, action: PayloadAction<TokenBalanceAction>) => {
        const element = state.find((element) => element.tokenAddress === action.payload.tokenAddress);
        
        if (!element) {
            state.push({ tokenAddress: action.payload.tokenAddress, tokenBalance: action.payload.balanceDifference })
        }
        else {
            element.tokenBalance -= action.payload.balanceDifference;
        }
    },
  },
});

export const { addBalance, removeBalance } = balanceSlice.actions;

export const selectBalances = (state: RootState) => state.balance; 

export const selectBalance = (state: RootState, tokenAddress: string) => {
    return state.balance.find((element) => element.tokenAddress === tokenAddress)?.tokenBalance
}; 

export default balanceSlice.reducer;