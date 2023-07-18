// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableToken is ERC20 {
    address public owner;
    constructor(string memory name, string memory symbol) ERC20(name, symbol){
        owner = msg.sender;
    }

    function mintTo(address account, uint256 amount) external {
        _mint(account, amount);
    }
}