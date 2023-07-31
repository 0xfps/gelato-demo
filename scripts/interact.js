const { ethers } = require("ethers")
const relaySdk = require("@gelatonetwork/relay-sdk")
const dotenv = require("dotenv")

dotenv.config()

const provider = new ethers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.API_KEY}`)

const main = async () => {
    // Gelato implementer on Goerli.
    const GelImp = "0x239C80DBcdAa1bdeEFd6a7f2bc4421020E092BD3"

    const { abi } = require("../artifacts/contracts/GelatoImplementer.sol/GelatoImplementer.json")

    const Gel = new ethers.Contract(GelImp, abi, provider)
    // console.log(Gel)

    // Make a call to the increment function in the GelatoImplementer contract.
    const { data } = await Gel.increment.populateTransaction()

    // Request structure.
    const request = {
        chainId: 5, // Goerli.
        // GelatoImplementer address on Goerli
        // https://goerli.etherscan.io/address/0x239C80DBcdAa1bdeEFd6a7f2bc4421020E092BD3
        target: GelImp,
        data: data,
        isRelayContext: true,
        feeToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    }

    // The functions below all fail.
    const relay = new relaySdk.GelatoRelay();
    const relayResponse = await relay.callWithSyncFee(request);

    console.log(relayResponse)
}

main()