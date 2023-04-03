import BlockHero from "@/components/BlockHero"
import Table from "@/components/Table"
import MainLayout from "@/layouts/MainLayout"
import alchemy from "@/web3/alchemy"
import { Utils } from "alchemy-sdk"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Block() {
	const router = useRouter()
	const [block, setBlock] = useState<any>(null)
	const [blockTransactions, setBlockTransactions] = useState<any>([])

	const getBlockWithTransactions = async (blockNumber: any) => {
		let block = await alchemy.core.getBlockWithTransactions(blockNumber)
		let latestTransactions = block.transactions.slice(-5)
		let data: any = []
		latestTransactions.map((transaction: any, i: number) => {
			data.push({
				key: transaction.hash,
				fields: [
					{
						type: "link",
						value: `${transaction.hash.slice(0, 15)}...`,
						href: `/transaction?id=${transaction.hash}`,
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
		setBlock(block)
		setBlockTransactions(data)
	}

	useEffect(() => {
		if (!router.isReady) return

		getBlockWithTransactions(router.query.id)
	}, [router])

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="flex flex-col gap-4">
				{block && (
					<>
						<BlockHero block={block} latest={false} />
						{blockTransactions && (
							<div className="hero max-h-fit bg-primary-content">
								<div className="hero-content text-center">
									<div className="max-w-5xl flex flex-col gap-4 text-start">
										<h1 className="text-3xl font-bold">Latest transactions:</h1>
										<Table headers={["Hash", "Sender", "Receiver", "Value"]} data={blockTransactions} />
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

Block.layout = MainLayout
