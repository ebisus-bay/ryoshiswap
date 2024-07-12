// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity =0.8.13;

interface IRyoshiFactory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );

    event FeeSetterChanged(address indexed oldSetter, address indexed newSetter);
    event FeeToChanged(address indexed oldFeeTo, address indexed newFeeTo);
    event SwapFeeChanged(address indexed pair, uint32 oldSwapFee, uint32 newSwapFee);
    event DefaultFeeChanged(uint32 oldSwapFee, uint32 newSwapFee);

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function swapFee() external view returns (uint32);

    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;
    function setSwapFee(address pair, uint32 swapFee) external;
}
