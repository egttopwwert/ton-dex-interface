import { useState } from 'react';
import ReactDOM from 'react-dom';

import ModalStyles from "./Modal.module.css";
import ConfirmModalStyles from "./ConfirmModal.module.css";

import { ReactComponent as CloseModalIcon } from "./CloseModalIcon.svg";

export interface ConfirmModalProps {
    isModalShown: boolean;
    toggleModal: () => void;
    content: JSX.Element;
    onCancel?: () => void;
    onConfirm?: () => void;
};

export const ConfirmModal = ({
    isModalShown,
    toggleModal,
    content,
    onCancel,
    onConfirm,
}: ConfirmModalProps) => {
    
    const confirmModal = (
        <div className={ModalStyles.Modal}>
            <div className={ModalStyles.Header}>
               Confirm
               <CloseModalIcon onClick={() => { if (onCancel) { onCancel(); } toggleModal(); }}/>
            </div>
            
            <div className={ConfirmModalStyles.Content}>
                { content }
            </div>
            <div className={ModalStyles.Button} onClick={() => { if (onConfirm) { onConfirm(); } toggleModal(); }}>
                Confirm
            </div>
        </div>
    );
    
    // <div id="modal"></div> in index.html
    const modalElement = document.getElementById("modal")!;

    if (isModalShown) {
        modalElement.style.display = "flex";
        return ReactDOM.createPortal(confirmModal, modalElement);
    }
    else {
        modalElement.style.display = "none";
        return null;
    }
};

export const useConfirmModal = () => {
    const [isConfirmModalShown, setIsConfirmModalShown] = useState<boolean>(false);
    const toggleConfirmModal = () => setIsConfirmModalShown(!isConfirmModalShown);
    
    return [ isConfirmModalShown, toggleConfirmModal ] as const;
};