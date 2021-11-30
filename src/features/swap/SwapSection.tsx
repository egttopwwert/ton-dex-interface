import React, { useState } from 'react';

// components
import { ConfirmModal, useConfirmModal } from "./ConfirmModal";
import { TokenInput } from './TokenInput';

// styles
import styles from "./SwapSection.module.css";
import { getParsedCommandLineOfConfigFile } from 'typescript';

const SwapSection = () => {
    
    // const tokenAddresses = ["TON_address", "TKN1_address", "TKN2_address", "TKN3_address", "TKN4_address" ];
    // const tokenBalances = [1000, 500, 300, 200, 50];

    // const getSelectedTokenAddressIndex = (selectedTokenAddress: string) => tokenAddresses.findIndex((tokenAddress) => {
    //     return tokenAddress === selectedTokenAddress;
    // });


    const [fromTokenAddress, setFromTokenAddress] = useState<string>("TON_address");
    const [fromTokenAmount, setFromTokenAmount] = useState<number>(0);
    // const [fromTokenBalance, setFromTokenBalance] = useState<number>(0);

    const [toTokenAddress, setToTokenAddress] = useState<string>("");
    const [toTokenAmount, setToTokenAmount] = useState<number>(0);
    // const [toTokenBalance, setToTokenBalance] = useState<number>(0);

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
        if (checkTokenInputs()) toggleConfirmModal();
        console.log("Form handled!");
    };

    const handleFromTokenInput = (tokenAddress: string, tokenAmount: number) => {
        setFromTokenAddress(tokenAddress);
        setFromTokenAmount(tokenAmount);
    }

    const handleToTokenInput = (tokenAddress: string, tokenAmount: number) => {
        setToTokenAddress(tokenAddress);
        setToTokenAmount(tokenAmount);
    }

    const handleOnCofirm = () => {
        console.log(`Swapping ${fromTokenAmount} ${fromTokenAddress} for ${toTokenAmount} ${toTokenAddress}`);
    }; 

    const fromTokenBalance = 1000;
    const toTokenBalance = 1000;

    return (
        <React.Fragment>
            <section style={{ marginTop: 48 }}>
                <h1>Swap</h1>

                <form className={styles.Form} onSubmit={handleSubmit}>
                    <label className={styles.Label}>
                        From:
                        <TokenInput 
                            tokenAddress={fromTokenAddress}
                            exceptTokenAddress={toTokenAddress}
                            onInput={handleFromTokenInput}
                        />
                        <span className={styles.Balance}>Balance: { fromTokenBalance }</span>
                    </label>
                    <label className={styles.Label}>
                        To:
                        <TokenInput 
                            tokenAddress={toTokenAddress}
                            exceptTokenAddress={fromTokenAddress}
                            onInput={handleToTokenInput}
                        />
                        <span className={styles.Balance}> Balance: { toTokenBalance }</span>
                    </label>
                    
                    <input className={styles.Button} type="submit" value="Swap" />
                </form>
                
                <div className="transactionHistory">There will be swap transaction history.</div>
            </section>

            <ConfirmModal
                isModalShown={isConfirmModalShown} 
                toggleModal={toggleConfirmModal} 
                content={confirmModalContent} 
                onConfirm={() => handleOnCofirm() }
                onCancel={() => console.log("Modal canceled.") }
            />
        </React.Fragment>
        
    );
};

export default SwapSection;

function getPrice(fromTokenAddress: string, toTokenAddress: string) {
    return { 
        firstTokenPerSecondTokenPrice: 5, 
        secondTokenPerFirstTokenPrice: 0.2,
    };
}