import React from 'react';

// components
import { TokenSelect } from './TokenSelect';

// styles
import TokenInputStyles from "./TokenInput.module.css";

export interface TokenInputProps {
    selectedTokenAddress: string;
    selectedTokenAmount: string,
    selectedTokenBalance: number,
    exceptTokenAddress: string;
    onSelect: (tokenAddress: string) => void;
    onInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const TokenInput = ({ 
    selectedTokenAddress, 
    selectedTokenAmount,
    selectedTokenBalance,
    exceptTokenAddress,
    onSelect,
    onInput
}: TokenInputProps) => {

    // const handleOnTokenSelect = (tokenAddress: string) => {
    //     setSelectedTokenAddress(tokenAddress);
    //     setSelectedTokenAmount("");
    //     onInput(tokenAddress, 0);
    // }

    // const handleOnTokenAmountInput = (event: React.FormEvent<HTMLInputElement>) => {        
    //     const tokenBalance = selectedTokenBalance ? selectedTokenBalance : 0;
    //     const tokenAmount = parseFloat(event.currentTarget.value);

    //     if (tokenAmount > tokenBalance || tokenAmount < 0 ||  event.currentTarget.value.split(".")[1]?.length > 6) {
    //         return;
    //     }
    //     else {
    //         const t = event.currentTarget.value;
            
    //         if (t[0] === "0" && t[1] !== ".") {
    //             setSelectedTokenAmount("0");
    //             onInput(selectedTokenAddress, 0);
    //         }
    //         else {
    //             setSelectedTokenAmount(t);
    //             onInput(selectedTokenAddress, parseFloat(t) || 0);
    //         }
    //     }
    // };

    return (
        <div className={TokenInputStyles.TokenInput}>
            <TokenSelect 
                selectedTokenAddress={selectedTokenAddress}
                selectedTokenAmount={selectedTokenAmount}
                selectedTokenBalance={selectedTokenBalance}
                exceptTokenAddress={exceptTokenAddress}
                onSelect={onSelect}
            />
            <input 
                type="number" 
                step="0.000001" 
                className={TokenInputStyles.TokenAmountInput} 
                onInput={onInput}
                placeholder="0.0"
                value={selectedTokenAmount}
            />
        </div>
    );     
}