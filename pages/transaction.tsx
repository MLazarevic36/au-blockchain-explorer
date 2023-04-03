import TransactionHero from "@/components/TransactionHero"
import MainLayout from "@/layouts/MainLayout"
import alchemy from "@/web3/alchemy"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Transaction() {
	const router = useRouter()
	const [transaction, setTransaction] = useState(null)

	const getTransaction = async (hash: any) => {
		const transaction: any = await alchemy.core.getTransactionReceipt(hash)
		setTransaction(transaction)
	}

	useEffect(() => {
		if (!router.isReady) return

		getTransaction(router.query.id)
	}, [router])

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="flex flex-col gap-4">{transaction && <TransactionHero transaction={transaction} />}</div>
		</div>
	)
}

Transaction.layout = MainLayout
