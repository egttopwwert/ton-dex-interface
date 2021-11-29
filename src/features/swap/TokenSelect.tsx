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

interface TokenSelectProps {
    tokenAddress: string;
    onSelect: (tokenAddress: string) => void;
};

export const TokenSelect = ({ tokenAddress, onSelect }: TokenSelectProps) => {

    const [ isTokenSelectModalShown, toggleTokenSelectModal ] = useTokenSelectModal();
    const [ selectedTokenAddress, setSelectedTokenAdress ] = useState<string>(tokenAddress);

    return (
        <React.Fragment>
            <div className={TokenSelectStyles.TokenSelect} onClick={toggleTokenSelectModal}>
                <TokenLabel tokenAddress={selectedTokenAddress} />
                <OpenSelectIcon />
            </div>
            <TokenSelectModal 
                isModalShown={isTokenSelectModalShown}
                toggleModal={toggleTokenSelectModal}
                selectedTokenAddress={selectedTokenAddress}
                onSelect={(tokenAddress) => { 
                    onSelect(tokenAddress); 
                    setSelectedTokenAdress(tokenAddress); 
                }}
            />
        </React.Fragment>
    );
};


export interface TokenSelectModalProps {
    isModalShown: boolean;
    toggleModal: () => void;
    selectedTokenAddress: string;
    onCancel?: () => void;
    onSelect?: (tokenAddress: string) => void;
};

export const TokenSelectModal = ({
    isModalShown,
    toggleModal,
    selectedTokenAddress,
    onCancel,
    onSelect,
}: TokenSelectModalProps) => {
    
    const tokenAddresses = ["TON_address", "TKN1_address", "TKN2_address", "TKN3_address", "TKN4_address" ];
    const tokenBalances = [1000, 500, 300, 200, 50];

    const [selectedTokenAdressIndex, setSelectedTokenAdressIndex] = useState(tokenAddresses.findIndex((tokenAddress) => {
        return tokenAddress === selectedTokenAddress;
    }));

    const renderedTokenAdressesListItems = tokenAddresses.map((tokenAddress, tokenAddressIndex) => {
        return (
            <li 
                key={tokenAddress}
                onClick={() => setSelectedTokenAdressIndex(tokenAddressIndex)}
                className={ `${TokenSelectModalStyles.TableItem} ${ (tokenAddressIndex === selectedTokenAdressIndex) ? TokenSelectModalStyles.ActiveTableItem : null}` }
            >
                <TokenLabel tokenAddress={tokenAddress} />
                <span className={TokenSelectModalStyles.TokenBalance}>{ tokenBalances[tokenAddressIndex] }</span>
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

            <div className={ModalStyles.Button} onClick={() => { if (onSelect) { onSelect(tokenAddresses[selectedTokenAdressIndex]); } toggleModal(); }}>
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