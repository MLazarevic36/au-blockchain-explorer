const NftCard = ({ nft }) => {
	return (
		<div className="card w-96 bg-secondary shadow-xl">
			<div className="card-body">
				<h2 className="card-title text-base-100">{!nft.metadataError ? nft.rawMetadata.name : nft.contract.name}</h2>
				<p className="text-base-100">{!nft.metadataError && nft.rawMetadata.description}</p>
			</div>
			<figure>
				<img src={!nft.metadataError ? nft.rawMetadata.image : nft.contract.openSea.imageUrl} alt="nft" />
			</figure>
		</div>
	)
}

export default NftCard
