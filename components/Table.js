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
					{data.map((row, i) => {
						return (
							<tr key={row.key}>
								{row.fields.map((field, i) => {
									if (field.type === "string") {
										return <td>{field.value}</td>
									} else if (field.type === "link") {
										return (
											<td>
												<a className="link link-info" href={field.href}>
													{field.value}
												</a>
											</td>
										)
									}
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Table
