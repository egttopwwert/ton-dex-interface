import { NavLink } from "react-router-dom";

import "./NavBar.module.css"

import { ReactComponent as ChartsIcon } from "./Charts.svg";
import { ReactComponent as SwapIcon } from "./Swap.svg";
import { ReactComponent as LiquidityIcon } from "./Liquidity.svg";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="charts">
                        <ChartsIcon />
                        Charts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="swap">
                        <SwapIcon />
                        Swap
                    </NavLink>
                </li>
                <li>
                    <NavLink to="liquidity">
                        <LiquidityIcon />
                        Liquidity
                    </NavLink>
                    </li>
            </ul>
        </nav>
    );
}

export default NavBar;