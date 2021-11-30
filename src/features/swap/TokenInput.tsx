import { useState } from 'react';

// components
import { TokenSelect } from './TokenSelect';

// styles
import TokenInputStyles from "./TokenInput.module.css";

export interface TokenInputProps {
    tokenAddress: string;
    exceptTokenAddress: string;
    onInput: (tokenAddress: string, tokenAmount: number) => void;
}

export const TokenInput = ({ tokenAddress, exceptTokenAddress, onInput }: TokenInputProps) => {

    const tokenAddresses = ["TON_address", "TKN1_address", "TKN2_address", "TKN3_address", "TKN4_address" ];
    const tokenBalances = [1000, 500, 300, 200, 50];

    const getSelectedTokenAddressIndex = (selectedTokenAddress: string) => tokenAddresses.findIndex((tokenAddress) => {
        return tokenAddress === selectedTokenAddress;
    });

    const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>(tokenAddress);
    const [selectedTokenAmount, setSelectedTokenAmount] = useState<string>("");
    
    const handleOnTokenSelect = (tokenAddress: string) => {
        setSelectedTokenAddress(tokenAddress);
        setSelectedTokenAmount("");
        onInput(tokenAddress, 0);
    }

    const handleOnTokenAmountInput = (event: React.FormEvent<HTMLInputElement>) => {        
        const tokenBalance = tokenBalances[getSelectedTokenAddressIndex(selectedTokenAddress)];
        const tokenAmount = parseFloat(event.currentTarget.value);

        if (tokenAmount > tokenBalance || tokenAmount < 0 ||  event.currentTarget.value.split(".")[1]?.length > 6) {
            return;
        }
        else {
            const t = event.currentTarget.value;
            
            if (t[0] === "0" && t[1] !== ".") {
                setSelectedTokenAmount("0");
                onInput(selectedTokenAddress, 0);
            }
            else {
                setSelectedTokenAmount(t);
                onInput(selectedTokenAddress, parseFloat(t) || 0);
            }
        }
    };

    return (
        <div className={TokenInputStyles.TokenInput}>
            <TokenSelect 
                tokenAddress={selectedTokenAddress}
                exceptTokenAddress={exceptTokenAddress}
                onSelect={handleOnTokenSelect}
            />
            <input 
                type="number" 
                step="0.000001" 
                className={TokenInputStyles.TokenAmountInput} 
                onInput={handleOnTokenAmountInput}
                placeholder="0.0"
                value={selectedTokenAmount}
            />
        </div>
    );     
}