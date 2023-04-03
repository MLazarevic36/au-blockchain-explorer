const BlockHero = ({ block, latest }) => {
	return (
		<div className="hero max-h-fit bg-primary-content">
			<div className="hero-content text-center">
				<div className="min-w-full flex flex-col gap-4 text-start">
					<h1 className="text-3xl font-bold">
						{latest ? "Latest block:" : "Block:"} {block.number}
					</h1>
					<p>
						Hash:{" "}
						<a className="link link-info" href={`/block?id=${block.hash}`}>
							{block.hash.slice(0, 15)}...
						</a>
					</p>
					<p>
						Previous hash:{" "}
						<a className="link link-info" href={`/block?id=${block.parentHash}`}>
							{block.parentHash.slice(0, 20)}...
						</a>
					</p>
					<p>Date: {new Date(block.timestamp * 1000).toLocaleString()}</p>
					<p>Nonce: {block.nonce}</p>
					<p>Transaction count: {block.transactions.length}</p>
				</div>
			</div>
		</div>
	)
}

export default BlockHero
