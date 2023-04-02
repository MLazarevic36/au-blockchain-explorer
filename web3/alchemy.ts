import { Alchemy, Network } from "alchemy-sdk"

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
	apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
	network: Network.ETH_MAINNET, // Replace with your network.
}

const alchemy: any = new Alchemy(settings)

export default alchemy
