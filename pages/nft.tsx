import NftCard from "@/components/NftCard"
import Search from "@/components/Search"
import MainLayout from "@/layouts/MainLayout"
import alchemy from "@/web3/alchemy"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Nft() {
	const router = useRouter()
	const [nfts, setNfts] = useState<any>([])

	const getNfts = async (address: any) => {
		const nfts: any = await alchemy.nft.getNftsForOwner(address)
		setNfts(nfts.ownedNfts)
	}

	useEffect(() => {
		if (!router.isReady) return

		if (router.query.address) getNfts(router.query.address)
	}, [router])

	console.log(nfts)

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<Search router={router} placeholder="Enter an address.." hrefParam={"address"} />
			<div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
				{nfts.length > 0 ? nfts.slice(-20).map((nft: any, i: any) => <NftCard key={i} nft={nft} />) : <p>No NFTs</p>}
			</div>
		</div>
	)
}

Nft.layout = MainLayout
