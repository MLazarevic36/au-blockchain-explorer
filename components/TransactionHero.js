const TransactionHero = ({ transaction }) => {
	return (
		<div className="hero max-h-fit bg-primary-content">
			<div className="hero-content text-center">
				<div className="min-w-full flex flex-col gap-4 text-start">
					<h1 className="text-3xl font-bold">
						{"Transaction:"} {transaction.transactionHash.slice(0, 15)}...
					</h1>
					<p>
						Block:{" "}
						<a className="link link-info" href={`/block?id=${transaction.blockHash}`}>
							{transaction.blockHash}
						</a>
					</p>

					<p>
						Sender:{" "}
						<a className="link link-info" href={`/account?address=${transaction.from}`}>
							{`${transaction.from}`}
						</a>
					</p>
					<p>
						Receiver:{" "}
						<a className="link link-info" href={`/account?address=${transaction.to}`}>
							{`${transaction.to}`}
						</a>
					</p>

					<p>Status: {transaction.status === 1 ? "success" : "failure"}</p>
				</div>
			</div>
		</div>
	)
}

export default TransactionHero
