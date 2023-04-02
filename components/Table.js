const { Utils } = require("alchemy-sdk")

const Table = ({ headers, data }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table table-compact w-full">
				{/* head */}
				<thead>
					<tr>
						{headers.map((header, i) => (
							<th key={header + i}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					{data.map((row, i) => {
						return (
							<tr key={row.hash}>
								<td>{row.hash.slice(0, 15)}...</td>
								<td>
									<a className="link link-info" href={`/account?address=${row.from}`}>
										{row.from.slice(0, 15)}...
									</a>
								</td>
								<td>
									<a className="link link-info" href={`/account?address=${row.to}`}>
										{row.to.slice(0, 15)}...
									</a>
								</td>
								<td>{Utils.formatUnits(row.value._hex, "ether").slice(0, 7)} ETH</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Table
