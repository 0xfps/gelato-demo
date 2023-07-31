// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {GelatoRelayContext} from "@gelatonetwork/relay-context/contracts/GelatoRelayContext.sol";

contract GelatoImplementer is GelatoRelayContext {
    receive() external payable {}

    uint256 count;

    function increment() public onlyGelatoRelay {
        _transferRelayFee();
        ++count;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}