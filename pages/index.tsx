import BlockHero from "@/components/BlockHero"
import Table from "@/components/Table"
import MainLayout from "@/layouts/MainLayout"
import alchemy from "@/web3/alchemy"
import { Utils } from "alchemy-sdk"
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
		let data: any = []
		latestTransactions.map((transaction: any, i: number) => {
			data.push({
				key: transaction.hash,
				fields: [
					{
						type: "link",
						value: `${transaction.hash.slice(0, 15)}...`,
						href: `/block?id=${transaction.hash}`,
					},
					{
						type: "link",
						value: `${transaction.from.slice(0, 15)}...`,
						href: `/account?address=${transaction.from}`,
					},
					{
						type: "link",
						value: `${transaction.to.slice(0, 15)}...`,
						href: `/account?address=${transaction.to}`,
					},
					{
						type: "string",
						value: `${Utils.formatUnits(transaction.value._hex, "ether").slice(0, 7)} ETH`,
					},
				],
			})
		})
		setLatestBlock(latestBlock)
		setLatestTransactions(data)
	}

	useEffect(() => {
		getLatestBlock()
	}, [])

	useEffect(() => {
		if (latestBlockNumber) {
			getBlockWithTransactions(latestBlockNumber)
		}
	}, [latestBlockNumber])

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="flex flex-col gap-4">
				{latestBlock && (
					<>
						<BlockHero block={latestBlock} latest={true} />
						{latestTransactions && (
							<div className="hero max-h-fit bg-primary-content">
								<div className="hero-content text-center">
									<div className="max-w-5xl flex flex-col gap-4 text-start">
										<h1 className="text-3xl font-bold">Latest transactions:</h1>
										<Table headers={["Hash", "Sender", "Receiver", "Value"]} data={latestTransactions} />
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

Home.layout = MainLayout
