import Table from "@/components/Table"
import MainLayout from "@/layouts/MainLayout"
import alchemy from "@/web3/alchemy"
import { useEffect, useState } from "react"

export default function Home() {
	const [latestBlockNumber, setLatestBlockNumber] = useState(null)
	const [latestBlock, setLatestBlock] = useState<any>(null)
	const [latestTransactions, setLatestTransactions] = useState<any>([])

	const getLatestBlock = async () => {
		const latestBlockNumber: any = await alchemy.core.getBlockNumber()
		setLatestBlockNumber(latestBlockNumber)
	}

	const getBlockWithTransactions = async (blockNumber: any) => {
		let latestBlock = await alchemy.core.getBlockWithTransactions(blockNumber)
		let latestTransactions = latestBlock.transactions.slice(-5)
		setLatestBlock(latestBlock)
		setLatestTransactions(latestTransactions)
	}

	useEffect(() => {
		getLatestBlock()
	}, [])

	useEffect(() => {
		if (latestBlockNumber) {
			getBlockWithTransactions(latestBlockNumber)
		}
	}, [latestBlockNumber])

	console.log(latestTransactions, "latest")

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="flex flex-col gap-4">
				{latestBlock && (
					<>
						<div className="hero max-h-fit bg-primary-content">
							<div className="hero-content text-center">
								<div className="min-w-full flex flex-col gap-4 text-start">
									<h1 className="text-3xl font-bold">Latest block: {latestBlock.number}</h1>
									<p>
										Hash: <a className="link link-info">{latestBlock.hash.slice(0, 15)}...</a>
									</p>
									<p>
										Previous hash: <a className="link link-info">{latestBlock.parentHash.slice(0, 20)}...</a>
									</p>
									{/* <p>
									Block number: <a className="link link-info">{latestBlock.number}</a>
								</p> */}
									<p>Date: {new Date(latestBlock.timestamp * 1000).toLocaleString()}</p>
									<p>Nonce: {latestBlock.nonce}</p>
									<p>Transaction count: {latestBlock.transactions.length}</p>
								</div>
							</div>
						</div>
						<div className="hero max-h-fit bg-primary-content">
							<div className="hero-content text-center">
								<div className="max-w-5xl flex flex-col gap-4 text-start">
									<h1 className="text-3xl font-bold">Latest transactions:</h1>
									{/* {latestBlock.transactions} */}
									<Table headers={["Hash", "Sender", "Receiver", "Value"]} data={latestTransactions} />
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

Home.layout = MainLayout
