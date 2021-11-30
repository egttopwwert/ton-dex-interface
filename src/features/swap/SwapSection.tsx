import React, { useState } from 'react';

// store
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    addBalance,
    removeBalance,
    selectBalance,
  } from '../account/balanceSlice';

// components
import { ConfirmModal, useConfirmModal } from "./ConfirmModal";
import { TokenInput } from './TokenInput';

// styles
import styles from "./SwapSection.module.css";

const SwapSection = () => {
    

    // const tokenAddresses = ["TON_address", "TKN1_address", "TKN2_address", "TKN3_address", "TKN4_address" ];
    // const tokenBalances = [1000, 500, 300, 200, 50];

    // const getSelectedTokenAddressIndex = (selectedTokenAddress: string) => tokenAddresses.findIndex((tokenAddress) => {
    //     return tokenAddress === selectedTokenAddress;
    // });

    const [fromTokenAddress, setFromTokenAddress] = useState<string>("TON_address");
    const [toTokenAddress, setToTokenAddress] = useState<string>("");
    
    
    const [toTokenAmount, setToTokenAmount] = useState<number>(0);
    const [fromTokenAmount, setFromTokenAmount] = useState<number>(0);
    // const [fromTokenBalance, setFromTokenBalance] = useState<number>(0);

    
    const [fromTokenAmountString, setFromTokenAmountString] = useState<string>("");
    const [toTokenAmountString, setToTokenAmountString] = useState<string>("");
    // const [toTokenBalance, setToTokenBalance] = useState<number>(0);
    
    const dispatch = useAppDispatch();

    const fromTokenBalance = useAppSelector((state) => selectBalance(state, fromTokenAddress));
    const toTokenBalance = useAppSelector((state) => selectBalance(state, toTokenAddress))

    const [ isConfirmModalShown, toggleConfirmModal ] = useConfirmModal();
    const confirmModalContent = <React.Fragment>Hey, I'm modal!</React.Fragment>;
    
    const checkTokenInputs = () => {
        if (toTokenAddress === "") {
            window.alert("Select token you want get.");
            return false;
        }
        else if (fromTokenAmount === 0) {
            window.alert("Enter amount of token you want swap.");
            return false;
        }
        else if (toTokenAmount === 0) {
            window.alert("Enter amount of token you want get.");
            return false;
        }

        return true;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        if (checkTokenInputs()) {
            toggleConfirmModal() 
        };

        console.log("Form handled!");
    };

    const handleFromTokenSelect = (tokenAddress: string) => {
        const x = fromTokenAmount ? fromTokenAmount : 0;

        setToTokenAmount(x / getPrice(fromTokenAddress, toTokenAddress));
        setToTokenAmountString(String(x / getPrice(fromTokenAddress, toTokenAddress)));
        
        setFromTokenAddress(tokenAddress);
        setFromTokenAmount(0);

        console.log("handleFromTokenSelect:", tokenAddress);
    };

    const handleToTokenSelect = (tokenAddress: string) => {
        const x = toTokenAmount ? toTokenAmount : 0;
        
        setFromTokenAmount(x / getPrice(toTokenAddress, fromTokenAddress));
        setFromTokenAmountString(String(x / getPrice(toTokenAddress, fromTokenAddress)));
        
        setToTokenAddress(tokenAddress);
        setToTokenAmount(0);

        console.log("handleToTokenSelect:", tokenAddress);
    };


    const handleTokenInput = (
        event: React.FormEvent<HTMLInputElement>,
        setTokenAmount: React.Dispatch<React.SetStateAction<number>>,
        setTokenAmountString: React.Dispatch<React.SetStateAction<string>>,
        limit: number,
    ) => {

        const t = event.currentTarget.value;

        console.log(t, limit);

        if (t === "") {
            event.currentTarget.value = "";
            setTokenAmountString("");
            setTokenAmount(0);
            return;
        }

        const tokenAmount = parseFloat(t) ? parseFloat(t) : 0;

        if (tokenAmount > limit || tokenAmount < 0 ||  event.currentTarget.value.split(".")[1]?.length > 6) {
            return;
        }
        else {
            if (t[0] === "0" && t[1] !== ".") {
                setTokenAmountString("0");
                setTokenAmount(0);
            }
            else {
                setTokenAmountString(t);
                setTokenAmount(tokenAmount);
            }
        }
    }

    const handleFromTokenInput = (event: React.FormEvent<HTMLInputElement>) => {
        const x = fromTokenAmount ? fromTokenAmount : 0;

        setToTokenAmount(x / getPrice(fromTokenAddress, toTokenAddress));
        setToTokenAmountString(String(x / getPrice(fromTokenAddress, toTokenAddress)));

        handleTokenInput(
            event, 
            setFromTokenAmount, 
            setFromTokenAmountString, 
            fromTokenBalance ? fromTokenBalance : 0
        );
    }

    const handleToTokenInput = (event: React.FormEvent<HTMLInputElement>) => {
        const x = toTokenAmount ? toTokenAmount : 0;
        
        setFromTokenAmount(x / getPrice(toTokenAddress, fromTokenAddress));
        setFromTokenAmountString(String(x / getPrice(toTokenAddress, fromTokenAddress)));

        handleTokenInput(
            event, 
            setToTokenAmount, 
            setToTokenAmountString, 
            toTokenBalance ? toTokenBalance : 0
        );
    }

    const handleConfirmModal = () => {
        console.log(`Swapping ${fromTokenAmount} ${fromTokenAddress} for ${toTokenAmount} ${toTokenAddress}`);

        dispatch(removeBalance({ tokenAddress: fromTokenAddress, balanceDifference: fromTokenAmount }));
        dispatch(addBalance({ tokenAddress: toTokenAddress, balanceDifference: toTokenAmount }));

        setFromTokenAmount(0);
        setFromTokenAmountString("");

        setToTokenAmount(0);
        setToTokenAmountString("");
    };

    return (
        <React.Fragment>
            <section style={{ marginTop: 48 }}>
                <h1>Swap</h1>

                <form className={styles.Form} onSubmit={handleSubmit}>
                    <label className={styles.Label}>
                        From:
                        <TokenInput 
                            selectedTokenAddress={fromTokenAddress}
                            selectedTokenAmount={fromTokenAmountString}
                            selectedTokenBalance={fromTokenBalance ? fromTokenBalance : 0}
                            exceptTokenAddress={toTokenAddress}
                            onSelect={handleFromTokenSelect}
                            onInput={handleFromTokenInput}
                        />
                        <span className={styles.Balance}>Balance: { fromTokenBalance ? fromTokenBalance : 0 }</span>
                    </label>
                    <label className={styles.Label}>
                        To:
                        <TokenInput 
                            selectedTokenAddress={toTokenAddress}
                            selectedTokenAmount={toTokenAmountString}
                            selectedTokenBalance={toTokenBalance ? toTokenBalance : 0}
                            exceptTokenAddress={fromTokenAddress}
                            onSelect={handleToTokenSelect}
                            onInput={handleToTokenInput}
                        />
                        <span className={styles.Balance}> Balance: { toTokenBalance? toTokenBalance : 0 }</span>
                    </label>
                    
                    <input className={styles.Button} type="submit" value="Swap" />
                </form>
            </section>

            <ConfirmModal
                isModalShown={isConfirmModalShown} 
                toggleModal={toggleConfirmModal} 
                content={confirmModalContent} 
                onConfirm={handleConfirmModal}
                onCancel={() => console.log("Modal canceled.") }
            />
        </React.Fragment>
        
    );
};

export default SwapSection;

// 10 YANOT = 1 TON
// 1000 SQUID = 1 TON
// 100 SQUID = 1 YANOT 

function getPrice(fromTokenAddress: string, toTokenAddress: string) {
    
    if (fromTokenAddress === "TON_address" && toTokenAddress === "YANOT_address") {
        return 0.1;
    }
    
    if (fromTokenAddress === "YANOT_address" && toTokenAddress === "TON_address") {
        return 10;
    }

    if (fromTokenAddress === "TON_address" && toTokenAddress === "SQUID_address") {
        return 0.001;
    }

    if (fromTokenAddress === "SQUID_address" && toTokenAddress === "TON_address") {
        return 1000;
    }

    if (fromTokenAddress === "YANOT_address" && toTokenAddress === "SQUID_address") {
        return 0.01;
    }

    if (fromTokenAddress === "SQUID_address" && toTokenAddress === "YANOT_address") {
        return 100;
    } 

    return 1;
}