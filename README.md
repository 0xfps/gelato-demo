# Gelato Demo

This codebase showcases a demo of the Gelato Relay Context used to increment the number stored in a simple `GelatoImplementer` contract. Unfortunately, it fails when the `relayWithSyncFee(request)` is called.

- `git clone https://github.com/0xfps/gelato-demo`
- `npm i`
- `npx hardhat compile`
- `npx hardhat test test/gelato-setup.test.js`