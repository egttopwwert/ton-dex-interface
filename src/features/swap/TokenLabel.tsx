import styles from "./TokenLabel.module.css";

import { ReactComponent as TONIcon } from "./TONIcon.svg";
import { ReactComponent as UnknownTokenIcon } from "./UnknownTokenIcon.svg";

interface TokenLabelProps {
    tokenAddress: string,
};

const TokenLabel = ({ tokenAddress }: TokenLabelProps) => {

    const tokenTicker = tokenAddress.split("_")[0];
    const tokenIcon = tokenAddress === "TON_address" ? <TONIcon /> : <UnknownTokenIcon />;

    return (
        <div className={styles.TokenLabel}>
            { tokenIcon }
            { tokenTicker }
        </div>
    );
};

export default TokenLabel;