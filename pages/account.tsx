import Search from "@/components/Search"
import Table from "@/components/Table"
import MainLayout from "@/layouts/MainLayout"
import alchemy from "@/web3/alchemy"
import { Utils } from "alchemy-sdk"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Account() {
	const router = useRouter()

	const [balance, setBalance] = useState<any>(null)
	const [otherBalances, setOtherBalances] = useState<any>(null)
	const [transactionHistory, setTransactionHistory] = useState<any>(null)

	const ustContract = "0xdac17f958d2ee523a2206206994597c13d831ec7"
	const usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
	// const maticContract = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"

	const getBalance = async (address: any) => {
		const balance: any = await alchemy.core.getBalance(address, "latest")
		const balances: any = await alchemy.core.getTokenBalances(address, [ustContract, usdcContract])
		const data: any = await alchemy.core.getAssetTransfers({
			// fromBlock: "0x0",
			fromAddress: address,
			category: ["external"],
		})
		// console.log(data, "trans")
		let latestTransactions = data.transfers.slice(-5)
		let tableData: any = []
		console.log(latestTransactions)
		latestTransactions.map((transaction: any, i: number) => {
			tableData.push({
				key: transaction.uniqueId,
				fields: [
					{
						type: "link",
						href: `/block?id=${transaction.blockNum}`,
						value: transaction.blockNum,
					},
					{
						type: "link",
						href: `/transaction?id=${transaction.hash}`,
						value: `${transaction.hash.slice(0, 15)}...`,
					},
					{
						type: "link",
						href: `/account?address=${transaction.from}`,
						value: `${transaction.from.slice(0, 15)}...`,
					},
					{
						type: "link",
						href: `/account?address=${transaction.to}`,
						value: `${transaction.to.slice(0, 15)}...`,
					},
					{
						type: "string",
						value: `${transaction.value} ${transaction.asset}`,
					},
				],
			})
		})
		setTransactionHistory(tableData)
		setOtherBalances(balances.tokenBalances)

		setBalance(balance)
	}

	useEffect(() => {
		if (!router.isReady) return

		if (router.query.address) getBalance(router.query.address)
	}, [router])

	// console.log(transactionHistory)

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<Search router={router} placeholder={"Enter an address.."} hrefParam={"address"} />
			{router.query.address && (
				<>
					<div className="hero max-h-fit max-w-fit bg-primary-content">
						<div className="hero-content text-center">
							<div className="max-w-fit flex flex-col gap-4 text-start">
								<h1 className="text-3xl font-bold">Address: {router.query.address}</h1>
								{balance && <p>ETH balance: {Utils.formatUnits(balance._hex, "ether").slice(0, 7)}</p>}
								{otherBalances &&
									otherBalances.map((token: any, i: any) => {
										return (
											<p key={i + token.tokenBalance}>
												{token.contractAddress === ustContract
													? "UST"
													: token.contractAddress === usdcContract
													? "USDC"
													: ""}{" "}
												balance: {token.tokenBalance / Math.pow(10, 6)}
											</p>
										)
									})}
							</div>
						</div>
					</div>
					{transactionHistory && (
						<div className="hero max-h-fit max-w-fit bg-primary-content">
							<div className="hero-content text-center">
								<div className="max-w-fit flex flex-col gap-4 text-start">
									<h1 className="text-3xl font-bold">Latest transactions:</h1>
									<Table headers={["Block", "Transaction", "Sender", "Receiver", "Value"]} data={transactionHistory} />
								</div>
							</div>
						</div>
					)}
					<a href={`/nft?address=${router.query.address}`}>Check nfts</a>
				</>
			)}
		</div>
	)
}

Account.layout = MainLayout
