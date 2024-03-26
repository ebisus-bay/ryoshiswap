// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity =0.8.4;

import {IRyoshiFactory} from "./interfaces/IRyoshiFactory.sol";
import {IRyoshiPair} from "./interfaces/IRyoshiPair.sol";
import {RyoshiPair} from "./RyoshiPair.sol";

contract RyoshiFactory is IRyoshiFactory {
    bytes32 public constant PAIR_HASH =
        keccak256(type(RyoshiPair).creationCode);

    address public override feeTo;
    address public override feeToSetter;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view override returns (uint256) {
        return allPairs.length;
    }

    function createPair(
        address tokenA,
        address tokenB
    ) external override returns (address pair) {
        require(tokenA != tokenB, "Ryoshi: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require(token0 != address(0), "Ryoshi: ZERO_ADDRESS");
        require(
            getPair[token0][token1] == address(0),
            "Ryoshi: PAIR_EXISTS"
        ); // single check is sufficient

        pair = address(
            new RyoshiPair{
                salt: keccak256(abi.encodePacked(token0, token1))
            }()
        );
        IRyoshiPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "Ryoshi: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "Ryoshi: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setSwapFee(address _pair, uint32 _swapFee) external override{
        require(msg.sender == feeToSetter, 'Ryoshi: FORBIDDEN');
        RyoshiPair(_pair).setSwapFee(_swapFee);
    }
}
