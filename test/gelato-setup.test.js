const hre = require("hardhat")
const relaySdk = require("@gelatonetwork/relay-sdk")

let alice,
    bob,
    charles,
    stableToken,
    stableTokenAddress,
    gelatoImplementer,
    gelatoImplementerAddress

const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
// Goerli LINK.
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"

describe("Setup StableToken and GelatoImplementer", async () => {
    before(async () => {
        [alice, bob, charles] = await ethers.getSigners()

        // Deploy ERC-20 StableToken and get address.
        const StableToken = await hre.ethers.getContractFactory("StableToken")
        stableToken = await StableToken.deploy("Token", "TOKN")
        stableTokenAddress = await stableToken.getAddress()

        // Deploy GelatoImplementer and get address.
        const GelatoImplementer = await hre.ethers.getContractFactory("GelatoImplementer")
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
        // console.log(`USDC owned by GelatoImplementer: ${await stableToken.balanceOf(gelatoImplementerAddress)}.`)
    })

    // it("Should send a transaction via Gelato Relay", async () => {
    //     // Make a call to the increment function in the GelatoImplementer contract. 
    //     const { data } = await gelatoImplementer.increment.populateTransaction()

    //     // Request structure.
    //     const request = {
    //         chainId: 5,
    //         target: gelatoImplementerAddress,
    //         data: data,
    //         isRelayContext: true,
    //         feeToken: LINK
    //     }

    //     // The functions below all fail.
    //     const relay = new relaySdk.GelatoRelay();
    //     const relayResponse = await relay.callWithSyncFee(request);

    //     console.log(relayResponse)
    // })
})