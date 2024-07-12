// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity =0.8.13;

import {IRyoshiFactory} from "./interfaces/IRyoshiFactory.sol";
import {IRyoshiPair} from "./interfaces/IRyoshiPair.sol";
import {RyoshiPair} from "./RyoshiPair.sol";

contract RyoshiFactory is IRyoshiFactory {
    bytes32 public constant PAIR_HASH =
        keccak256(type(RyoshiPair).creationCode);

    address public override feeTo;
    address public override feeToSetter;
    uint32 public override swapFee = 30; // 0.3% default 

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
        RyoshiPair(pair).setSwapFee(swapFee);
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "Ryoshi: FORBIDDEN");
        emit FeeToChanged(feeTo, _feeTo);
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "Ryoshi: FORBIDDEN");
        emit FeeSetterChanged(feeToSetter, _feeToSetter);
        feeToSetter = _feeToSetter;
    }

    function setDefaultFee(uint32 _swapFee) external  {
        require(msg.sender == feeToSetter, "Ryoshi: FORBIDDEN");
        require(_swapFee > 0, "RyoshiPair: lower then 0");
        require(_swapFee <= 100, 'RyoshiPair: FORBIDDEN_FEE');
        swapFee = _swapFee;
        emit DefaultFeeChanged(swapFee, _swapFee);
    }

    function setSwapFee(address _pair, uint32 _swapFee) external override{
        require(msg.sender == feeToSetter, 'Ryoshi: FORBIDDEN');
        require(_swapFee > 0, "RyoshiPair: lower then 0");
        require(_swapFee <= 100, 'RyoshiPair: FORBIDDEN_FEE');
        RyoshiPair(_pair).setSwapFee(_swapFee);
        emit SwapFeeChanged(_pair, swapFee, _swapFee);
    }
}
