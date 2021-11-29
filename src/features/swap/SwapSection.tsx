import React from 'react';

// styles
import styles from "./SwapSection.module.css";

// components
import { TokenSelect } from './TokenSelect';
import { ConfirmModal, useConfirmModal } from "./ConfirmModal";

const SwapSection = () => {
    const [ isConfirmModalShown, toggleConfirmModal ] = useConfirmModal();
    const confirmModalContent = <React.Fragment>Hey, I'm modal!</React.Fragment>;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        toggleConfirmModal();
        console.log("Form handled!");
    };

    const fromTokenBalance = 1000;
    const toTokenBalance = 1000;

    return (
        <React.Fragment>
            <section style={{ marginTop: 48 }}>
                {/* <TokenLabel tokenAddress="TON_address" />
                <TokenLabel tokenAddress="TKN1_address" /> */}

                <TokenSelect 
                    tokenAddress="TON_address"
                    onSelect={(tokenAddress) => console.log(tokenAddress) }
                />
                {/* <TokenSelect tokenAddress="TKN1_address" /> */}

                <h1>Swap</h1>

                <form className={styles.Form} onSubmit={handleSubmit}>
                    <label className={styles.Label}>
                        From:
                        <input type="text" />
                        <span className={styles.Balance}>Balance: { fromTokenBalance }</span>
                    </label>
                    <label className={styles.Label}>
                        To:
                        <input type="text" />
                        <span className={styles.Balance}> Balance: { toTokenBalance }</span>
                    </label>
                    
                    <input type="submit" value="Swap" />
                </form>
                
                <div className="transactionHistory">There will be swap transaction history.</div>

                
            </section>

            <ConfirmModal
                isModalShown={isConfirmModalShown} 
                toggleModal={toggleConfirmModal} 
                content={confirmModalContent} 
                onConfirm={() => console.log("Modal confirmed.") }
                onCancel={() => console.log("Modal canceled.") }
            />
        </React.Fragment>
        
    );
};

export default SwapSection;