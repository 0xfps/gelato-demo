const { ethers } = require("hardhat")
const { GelatoRelay } = require("@gelatonetwork/relay-sdk")

let alice,
    bob,
    charles,
    stableToken,
    stableTokenAddress,
    gelatoImplementer,
    gelatoImplementerAddress

describe("Setup StableToken and GelatoImplementer", async () => {
    before(async () => {
        [alice, bob, charles] = await ethers.getSigners()

        // Deploy ERC-20 StableToken and get address.
        const StableToken = await ethers.getContractFactory("StableToken")
        stableToken = await StableToken.deploy("Token", "TOKN")
        stableTokenAddress = await stableToken.getAddress()

        // Deploy GelatoImplementer and get address.
        const GelatoImplementer = await ethers.getContractFactory("GelatoImplementer")
        gelatoImplementer = await GelatoImplementer.deploy()
        gelatoImplementerAddress = await gelatoImplementer.getAddress()

        // Mint 50 USDC to GelatoImplementer.
        const mintAmount = ethers.parseEther("50")
        stableToken.mintTo(gelatoImplementerAddress, mintAmount)
    })

    // Output addresses as proof of successful deployments.
    it("Should output valid deployment addresses", async () => {
        console.log(`StableTokenMock is deployed to ${stableTokenAddress}.`)
        console.log(`GelatoImplementer deployed to ${gelatoImplementerAddress}.`)
        console.log(`USDC owned by GelatoImplementer: ${await stableToken.balanceOf(gelatoImplementerAddress)}.`)
    })

    it("Should send a transaction via Gelato Relay", async () => {
        // Make a call to the increment function in the GelatoImplementer contract. 
        const { data } = await gelatoImplementer.increment.populateTransaction()

        // Request structure.
        const request = {
            chainId: 1,
            target: gelatoImplementerAddress,
            data: data,
            isRelayContext: true,
            feeToken: stableTokenAddress
        }

        // The functions below all fail.
        const relayResponse = await relayWithSyncFee(request)
        // const relayResponse = await GelatoRelay.callWithSyncFee(request)
        // const relayResponse = await GelatoRelay.relayWithSyncFee(request)

        console.log(relayResponse)
    })
})