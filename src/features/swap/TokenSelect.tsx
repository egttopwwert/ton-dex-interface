import React, { useState } from "react";
import ReactDOM from "react-dom";

// styles
import TokenSelectStyles from "./TokenSelect.module.css";
import ModalStyles from "./Modal.module.css";
import TokenSelectModalStyles from "./TokenSelectModal.module.css";

// icons
import { ReactComponent as OpenSelectIcon } from "./OpenSelectIcon.svg";
import { ReactComponent as CloseModalIcon } from "./CloseModalIcon.svg";

// components
import TokenLabel from "./TokenLabel";
import { useAppSelector } from "../../app/hooks";
import { selectBalances } from "../account/balanceSlice";
import { selectTokens } from "../account/tokensSlice";

interface TokenSelectProps {
    selectedTokenAddress: string;
    selectedTokenAmount: string;
    selectedTokenBalance: number;
    exceptTokenAddress: string;
    onSelect: (tokenAddress: string) => void;
};

export const TokenSelect = ({ 
    selectedTokenAddress, 
    selectedTokenAmount,
    selectedTokenBalance,
    exceptTokenAddress,
    onSelect
}: TokenSelectProps) => {

    const [ isTokenSelectModalShown, toggleTokenSelectModal ] = useTokenSelectModal();


    // const [ selectedTokenAddress, setSelectedTokenAdress ] = useState<string>(tokenAddress);

    return (
        <React.Fragment>
            <div 
                className={ selectedTokenAddress === "" ? TokenSelectStyles.TokenSelectNoToken : TokenSelectStyles.TokenSelect } 
                onClick={toggleTokenSelectModal}
            >
                { selectedTokenAddress === "" ? <span>Select token</span> : <TokenLabel tokenAddress={selectedTokenAddress} /> }
                <OpenSelectIcon />
            </div>
            <TokenSelectModal
                exceptTokenAddress={exceptTokenAddress}
                isModalShown={isTokenSelectModalShown}
                toggleModal={toggleTokenSelectModal}
                tokenAddress={selectedTokenAddress}
                onSelect={onSelect}
            />
        </React.Fragment>
    );
};


export interface TokenSelectModalProps {
    isModalShown: boolean;
    toggleModal: () => void;
    tokenAddress: string;
    exceptTokenAddress: string;
    onCancel?: () => void;
    onSelect?: (tokenAddress: string) => void;
};

export const TokenSelectModal = ({
    isModalShown,
    toggleModal,
    tokenAddress,
    exceptTokenAddress, // address of token that won't be showed in list of available to select tokens
    onCancel,
    onSelect,
}: TokenSelectModalProps) => {
    
    // const tokenAddresses = ["TON_address", "SOME_address", "SQUID_address"];
    // const tokenBalances = [1000, 500, 300, 200, 50];

    const tokens = useAppSelector((state) => selectTokens(state));
    const balances = useAppSelector((state) => selectBalances(state));

    const [selectedTokenAdress, setSelectedTokenAdress] = useState<string>(tokenAddress);

    const renderedTokenAdressesListItems = tokens.map(({ address }) => {
        if (address === exceptTokenAddress) return null;

        const balance = balances.find(({ tokenAddress }) => {
            return tokenAddress === address;
        });

        return (
            <li 
                key={address}
                onClick={() => setSelectedTokenAdress(address)}
                className={ `${TokenSelectModalStyles.TableItem} ${ (address === selectedTokenAdress) ? TokenSelectModalStyles.ActiveTableItem : null}` }
            >
                <TokenLabel tokenAddress={address} />
                <span className={TokenSelectModalStyles.TokenBalance}>{ balance ? balance.tokenBalance : 0 }</span>
            </li>
        );
    });

    const tokenSelectModal = (
        <div className={ModalStyles.Modal}>
            <div className={ModalStyles.Header}>
               Select a token
               <CloseModalIcon onClick={() => { if (onCancel) { onCancel(); } toggleModal(); }}/>
            </div>
            
            <ul className={TokenSelectModalStyles.Table}>
                { renderedTokenAdressesListItems }
            </ul>

            <div className={ModalStyles.Button} onClick={() => { if (onSelect) { onSelect(selectedTokenAdress); } toggleModal(); }}>
                Select
            </div>
        </div>
    );
    
    // <div id="modal"></div> in index.html
    const rootModalElement = document.getElementById("modal")!;

    if (isModalShown) {
        rootModalElement.style.display = "flex";
        return ReactDOM.createPortal(tokenSelectModal, rootModalElement);
    }
    else {
        rootModalElement.style.display = "none";
        return null;
    }
};

export const useTokenSelectModal = () => {
    const [isTokenSelectModalShown, setIsTokenSelectModalShown] = useState<boolean>(false);
    const toggleTokenSelectModal = () => setIsTokenSelectModalShown(!isTokenSelectModalShown);
    
    return [ isTokenSelectModalShown, toggleTokenSelectModal ] as const;
};