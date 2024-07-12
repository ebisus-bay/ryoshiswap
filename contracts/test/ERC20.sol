// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity =0.8.13;

import {RyoshiERC20} from "../RyoshiERC20.sol";

contract ERC20 is RyoshiERC20 {
    constructor(uint256 _totalSupply) {
        _mint(msg.sender, _totalSupply);
    }
}
